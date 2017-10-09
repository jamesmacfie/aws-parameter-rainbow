# AWS Parameter Rainbow

Setting environment variables via the AWS UI is a right PITA. This script makes it slightly easier.

It uses [aws-vault](https://github.com/99designs/aws-vault) behind the scenes so you'll want to have that setup.

## How to use

1. Clone down this repo
2. Create a `config.json` file (as per details below)
3. Run `node .`
4. Laugh maniacally as you don't have to use the AWS UI

## `config.json`

You'll need to create a `config.json` file in the root of the project. At it's simplest all this needs to be an an object with the key as the variable name and the value the value of the parameter. This defaults to a type of `String`

Example:

``` json
{
	"/some/parameter/key/here": "80"
}
```

If you weant to specify a different type then you can have any key's value be an object with different options set.

Example

``` json
{
	"/some/secret/parameter/key/here": {
		"value": "hello-i-am-secret",
		"type": "SecureString",
		"kms": "alias/whatever"
	}
}
```

You can specify the `type` and, if it's a `SecureString` the Key ID as `kms`.

### Arguments

You'll probably want to override some of the default behaviour. This can be done via some command line arguments.

`--region`

The default region is `us-west-2` but you can pass in any other region you like.

`--profile`

There is no default profile set (as everyone's `aws-vault` settings are bound to be different) so you have to at least provide this. This is the name of whatever AWS config profile you want to use.

`--kms`

Although you can set the secret Key Id on a per value basis, you can also provide it via an argument. If you have any `SecureString` values and none of them have `kms` set as a property on the JSON object then you'll at least need this.
