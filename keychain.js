const keytar = require('keytar');

module.exports.templateTags = [{
  name: 'keychain',
  displayName: 'Keychain',
  description: 'Fetch a secret from the system keychain',
  args: [
    {
      displayName: 'Account',
      description: 'Account name',
      type: 'string',
    },
    {
      displayName: 'Service',
      description: 'Service name',
      type: 'string',
    }
  ],
  async run(context, account, service) {
    const password = await getPassword(account, service);
    return password;
  }
}];
