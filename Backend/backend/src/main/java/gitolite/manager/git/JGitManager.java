package gitolite.manager.git;

import java.io.File;
import java.io.IOException;

import com.diploma.git.backend.ssh.CustomSshSessionFactory;
import gitolite.manager.exceptions.GitException;
import gitolite.manager.exceptions.ServiceUnavailable;

import org.apache.commons.io.FileUtils;
import org.apache.sshd.agent.SshAgentFactory;
import org.apache.sshd.client.SessionFactory;
import org.apache.sshd.client.SshClient;
import org.eclipse.jgit.api.*;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.api.errors.JGitInternalException;
import org.eclipse.jgit.api.errors.NoFilepatternException;
import org.eclipse.jgit.errors.TransportException;
import org.eclipse.jgit.transport.*;
import org.eclipse.jgit.transport.sshd.SshdSessionFactory;
import org.eclipse.jgit.transport.sshd.SshdSessionFactoryBuilder;
import org.eclipse.jgit.util.FS;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.google.common.base.Preconditions;

/**
 * The {@link JGitManager} class is responsible for communicating with the
 * remote git repository containing the gitolite configuration.
 * 
 * @author Michael de Jong &lt;<a href="mailto:michaelj@minicom.nl">michaelj@minicom.nl</a>&gt;
 */
public class JGitManager implements GitManager {

	private static final Logger log = LoggerFactory.getLogger(JGitManager.class);
	
	private final File workingDirectory;
	private final CredentialsProvider credentialProvider;

	private final Object gitLock = new Object();
	private Git git;

	/**
	 * Constructs a new {@link JGitManager} object.
	 * 
	 * @param workingDirectory The working directory where we will clone to, and
	 *           manipulate the configuration files in. It's recommended to use a
	 *           temporary directory, unless you wish to keep the git repository.
	 * 
	 * @param credentialProvider The {@link CredentialsProvider} to use to
	 *           authenticate when cloning, pulling or pushing, from or to.
	 */
	public JGitManager(File workingDirectory, CredentialsProvider credentialProvider) {
		Preconditions.checkNotNull(workingDirectory);
		this.workingDirectory = workingDirectory;
		this.credentialProvider = credentialProvider;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#open()
	 */
	@Override
	public void open() throws IOException {
		synchronized (gitLock) {
			git = Git.open(workingDirectory);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#remove(java.lang.String)
	 */
	@Override
	public void remove(String filePattern) throws IOException, GitException {
		synchronized (gitLock) {
			RmCommand rm = git.rm();
			rm.addFilepattern(filePattern);
			try {
				rm.call();
			} catch (NoFilepatternException e) {
				throw new IOException(e);
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#clone(java.lang.String)
	 */
	@Override
	public void clone(String uri) throws ServiceUnavailable, GitException, IOException {
		Preconditions.checkNotNull(uri);

        try{
			SshClient client = new SshClient();
			SshSessionFactory sessionFactory = new SshSessionFactory() {
				@Override
				public RemoteSession getSession(URIish uri, CredentialsProvider credentialsProvider, FS fs, int tms) throws TransportException {
					
				}

				@Override
				public String getType() {
					return "";
				}
			};

		synchronized (gitLock) {

			ClassLoader classLoader = getClass().getClassLoader();
			File sshPrK = new File(FS.DETECTED.userHome(), "/.ssh/id_rsa");
			byte[] data = FileUtils.readFileToByteArray(sshPrK);



            CloneCommand clone = Git.cloneRepository();
			clone.setDirectory(workingDirectory);
			clone.setTransportConfigCallback(transport -> {
				if(transport instanceof SshTransport) {
					SshTransport sshTransport = (SshTransport) transport;
					// Provide private key to `CustomSshSessionFactory`
					SshSessionFactory sshFactory = new CustomSshSessionFactory(data);
					SshSessionFactory.setInstance();
					sshTransport.setSshSessionFactory(sessionFactory);

				}
			});
			clone.setURI(uri);
			try {
				git = clone.call();
			} catch (NullPointerException e) {
				throw new ServiceUnavailable(e);
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
        }
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#init()
	 */
	@Override
	public void init() throws GitException {
		synchronized (gitLock) {
			InitCommand initCommand = Git.init();
			initCommand.setDirectory(workingDirectory);
			try {
				git = initCommand.call();
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#pull()
	 */
	@Override
	public boolean pull() throws ServiceUnavailable, GitException {
		log.info("Pulling changes from remote git repo");
		synchronized (gitLock) {
			try {
				PullCommand pull = git.pull();
				return !pull.call().getFetchResult().getTrackingRefUpdates().isEmpty();
			} catch (NullPointerException e) {
				throw new ServiceUnavailable(e);
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#commitChanges()
	 */
	@Override
	public void commitChanges() throws IOException, GitException {
		synchronized (gitLock) {
			add(git, ".");
			commit(git, "Changed config...");
		}
	}

	private void commit(Git git, String message) throws GitException {
		synchronized (gitLock) {
			log.info("Commiting changes to local git repo");
			CommitCommand commit = git.commit();
			try {
				commit.setMessage(message).call();
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
		}
	}

	private void add(Git git, String pathToAdd) throws IOException, GitException {
		synchronized (gitLock) {
			log.info("Adding changes to commit");
			AddCommand add = git.add();
			try {
				add.addFilepattern(pathToAdd).call();
			} catch (NoFilepatternException e) {
				throw new IOException(e);
			} catch (GitAPIException e) {
				throw new GitException(e);
			}
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#push()
	 */
	@Override
	public void push() throws ServiceUnavailable, GitException {
		synchronized (gitLock) {
			try {
				log.info("Pushing changes to remote git repo");
				PushResult pushResult = git.push()
						.setCredentialsProvider(credentialProvider)
						.call().iterator().next();

				for(RemoteRefUpdate update : pushResult.getRemoteUpdates()) {
					checkPushSuccess(update);
				}
			} catch (NullPointerException e) {
				throw new ServiceUnavailable(e);
			} catch (GitAPIException | JGitInternalException e) {
				throw new GitException(e);
			}
		}
	}

	/**
	 * Check if the push succedded (remote is either up to date or the push could be fast forwarded)
	 * @param update {@code RemoteRefUpdate} to check
	 */
	private void checkPushSuccess(RemoteRefUpdate update) {
		switch(update.getStatus()){
            case OK:
            case UP_TO_DATE:
				return;
            default:
                throw new IllegalStateException("Cannot push config to gitolite config: " + update.getStatus());
        }
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see nl.minicom.gitolite.manager.git.GitManager#getWorkingDirectory()
	 */
	@Override
	public File getWorkingDirectory() {
		return workingDirectory;
	}

}
