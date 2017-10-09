const args = require('minimist')(process.argv.slice(2))
const chalk = require('chalk');
const chalkAnimation = require('chalk-animation');
const shell = require('shelljs');
const configs = require('./config.json');

const region = args.region || 'us-west-2';
const profile = args.profile;
const kms = args.kms;

if (!profile) {
	console.log(chalk.red('You need to give a profile'));
	return;
}


console.log(chalk.blue('Region set to ') + chalk.magenta(region));
console.log(chalk.blue('Profile set to ') + chalk.magenta(profile));
if (kms) {
	console.log(chalk.blue('KMS set to ') + chalk.magenta(kms));
}

function doAConfig(key, data) {
	let value;
	let type;
	let kmsKey;

	if (typeof data === 'string') {
		value = data;
		type = 'String';
	} else {
		value = data.value;
		type = data.type;
		kmsKey = kms || data.key;
	}

	console.log(
		chalk.blue('Setting ') +
		chalk.yellow(key) +
		chalk.blue(' to ') +
		chalk.magenta(value) +
		chalk.blue(' of type ') +
		chalk.green(type)
);

	let command = `aws-vault exec ${profile} -- aws ssm put-parameter --region ${region} --name "${key}" --value '${value}' --type "${type}"`;
	if (type === 'SecureString') {
		command += ` --key-id "${kmsKey}"`;
	}

	chalkAnimation.rainbow(`Running command: ${command}`);

	if (shell
		.exec(command)
		.code !== 0) {
		console.log(chalk.red('Nawww man! Failed to set ') + chalk.yellow(key));
	}
}

chalkAnimation.rainbow('About to start configuring configs');
setTimeout(() => { // This `setTimeout` here is just so I can see the pretty rainbows
	Object.keys(configs).forEach(key => doAConfig(key, configs[key]));
}, 1000);



