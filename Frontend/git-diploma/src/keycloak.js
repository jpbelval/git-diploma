import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: 'http://localhost:8180/',
    realm: 'usager',
    clientId: 'frontend',
  })

export default keycloak

export const hasStudentRole = (roles) => {
  let allowed = false;

  for (let index = 0; index < roles.length; index++) {
    const element = roles[index];
    if(element == 'student'){
      allowed = true;
      return allowed;
    }
  }


  return allowed;
};