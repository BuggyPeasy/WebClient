# WebClient

Codebase for web client

## Set Up

Run this command to set up your dev env:

```sh
bun install
```

### SSH Key

Reference: [link](https://github.com/git-merge-workshops/simplify-signing-with-ssh)

### Pre-requisites

1. git >= 2.34

   ```sh
   git --version
   ```

2. ssh >= 8.0

   ```sh
   ssh -V
   ```

3. Configure git with your user name and email address

   ```sh
   git config --global user.name "Your Name"
   git config --global user.email "your_email@example.com"
   ```

### SSH Key

1. Generate a new ssh key

   ```sh
   ssh-keygen -t ed25519 -C "your_email@example.com"
   	chmod 600 ~/.ssh/id_ed25519
   	chmod 644 ~/.ssh/id_ed25519.pub
   ```

2. Start up ssh agent and add ssh private key

   ```sh
   eval `ssh-agent`
   ssh-add ~/.ssh/id_ed25519
   ```

3. Create file containing ssh public key for verifying signers

   ```ssh
   awk '{ print $3 " " $1 " " $2 }' ~/.ssh/id_ed25519.pub >> ~/.ssh/allowed_signers
   ```

4. Configure SSH signing and verifying for WebClient repo

   ```sh
   cd WebClient
   git config gpg.format ssh
   git config user.signingkey "$(cat ~/.ssh/id_ed25519.pub)"
   git config gpg.ssh.allowedSignersFile ~/.ssh/allowed_signers
   ```

### Add Your Key to Github

1. Run this command to copy the key to your clipboard

   ```sh
   pbcopy < ~/.ssh/id_ed25519.pub
   ```

2. Go to Setting > SSH and PGP keys
3. Click New SSH Key
4. Add a title and select signing key for Key type
5. Paste your key to the Key textarea
6. Click "Add SSH Key" to add the key

### Sign your commits

1. Set up signing configuration

   ```sh
   git config commit.gpgsign true
   git config log.showSignature true
   git config merge.verifySignature true
   ```

2. Sign previous N commits

   ```sh
   git rebase --signoff HEAD~N
   ```

### Potential Errors

1. error: Couldn't find key in agent?

   - Solution:

     ```sh
     ssh-agent
     ssh-add ~/.ssh/id_ed25519
     ```

## Pre-Push Instructions

Before pushing, make sure that you pass when you type in the following commands:

```sh
bun run check
bun test
bun run build
```

## Design Documents:

[\[RFC 001\]](https://docs.google.com/document/d/1LMCIZxGV3gA6a_Nb2UF2tGQ7IeSA-fu13oAx9k4U6C4/edit?usp=sharing)
