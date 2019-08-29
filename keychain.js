const keychain = require('keychain');
const util = require('util');

module.exports.templateTags = [{
  name: 'keychain',
  displayName: 'Keychain',
  description: 'Fetch a secret from the macOS keychain',
  args: [
    {
      displayName: 'Account',
      description: 'Account name',
      type: 'string',
    },
    {
      displayName: 'Service (\'Where\' field in Keychain Access.app)',
      description: 'Service name',
      type: 'string',
    },
    {
      displayName: 'Kind',
      description: 'Kind of password',
      type: 'enum',
      options: [
        {
          displayName: 'Application password',
          value: 'generic'
        },
        {
          displayName: 'Internet password',
          value: 'internet'
        }
      ]
    }
  ],
  async run(_context, account, service, type) {
    // Just calling promisify on the function doesn't work here. I get:
    //
    // TypeError [ERR_INVALID_ARG_TYPE]: The "file" argument must be of type
    // string. Received type undefined
    //
    //const getPassword = util.promisify(keychain.getPassword);
    const getPassword = util.promisify((opts, callback) =>
      keychain.getPassword(opts, callback)
    );
    const password = await getPassword({
      account: account,
      service: service,
      type: type
    });
    return password;
  }
}];
