---
layout: post
title: "Informative Command Prompt"
description: "How to configure the command prompt to show useful information."
keywords: "zsh, prompt, git"
---

<style type="text/css">
.asciicast {
    text-align: center;
    padding-top: 20px !important;
}
</style>

Nowadays, it is hard to imagine software development without Git. However, for
many developers, Git is mysterious and has a steep learning curve. I have noticed
that the cause for most confusions around Git is either (1) the lack of
fundamental understanding of Git or (2) being unaware of the current Git state
or both.

In this article, we will focus on the second point --- being unaware of the
current Git state. One easy solution is to use `git status` as frequent as
possible. However, as engineers, we are lazy and would like to type as little as
possible. Therefore, **I would like to discuss how I configured the command
prompt such that it shows the Git state at all times, as shown in the image
below**. `master ?` indicates that untracked files are present in the active
`master` branch. The gemstone 💎 indicates what Ruby version is used for the
active project.

![Command prompt](/assets/images/command-prompt.png)

First, what is the command prompt? From
[Wikipedia](https://en.wikipedia.org/wiki/Command-line_interface#Command_prompt):

> A command prompt (or just prompt) is a sequence of (one or more) characters
> used in a command-line interface to indicate readiness to accept commands. It
> literally prompts the user to take action. A prompt usually ends with one of
> the characters `$`, `%`, `#`, `:`, `>` and often includes other information,
> such as the path of the current working directory and the hostname.

By default, macOS comes with Bash, Terminal, and the default command prompt:

```shell
<hostname>:<directory> <username>$ echo Hello, World!
Hello, World!
```

In my setup, I use Zsh, instead of Bash, with [Oh My
Zsh](https://github.com/robbyrussell/oh-my-zsh), a community-driven Zsh
framework for managing Zsh configuration. I don't necessarily think that Zsh is
better than Bash, but I do like the fact that the Oh My Zsh framework comes with
powerful defaults. For example, when changing to a certain directory in the
terminal using autocomplete, the default behavior of the Oh My Zsh framework
allows autocompletion without having to care about capitalization, see
video below.

<script src="https://asciinema.org/a/zHxcIaPLSKm87TQvbTnJy0sv2.js" id="asciicast-zHxcIaPLSKm87TQvbTnJy0sv2" async></script>

> Note: There exist many shell configuration frameworks like
> [Bash-it](https://github.com/Bash-it/bash-it),
> [zplug](https://github.com/zplug/zplug), and more.

More importantly, the Oh My Zsh framework comes with [many built-in prompt
themes](https://github.com/robbyrussell/oh-my-zsh/wiki/themes) that display the
necessary Git state of a directory. The Zsh theme that I am using at the moment
is called [Spaceship](https://github.com/denysdovhan/spaceship-prompt), an
external Zsh theme, which comes with a nice default prompt that is very
informative, and allows easy
[configuration](https://denysdovhan.com/spaceship-prompt/docs/Options.html)
of the prompt when necessary.

## Installation

1. Install Zsh:

   ```shell
   # On macOS
   $ brew install zsh

   # On Ubuntu
   $ sudo apt-get install zsh
   ```

2. [Install Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh#basic-installation):

   ```shell
   $ sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
   ```

3. [Install Spaceship](https://github.com/denysdovhan/spaceship-prompt#oh-my-zsh):

   ```shell
   $ git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt"
   $ ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
   ```

   > Note: Spacehip recommends using a [Powerline
   > font](https://github.com/powerline/fonts) for displaying certain
   > symbols. For example, for Git it shows a branching symbol, see video below.
   > However, if you don't care about this, you can configure the Spaceship theme
   > to just ignore this symbol by setting `SPACESHIP_GIT_SYMBOL=""` in
   > `~/.zshrc` [**before** sourcing the theme](https://github.com/aaronang/dotfiles/blob/61f71d6a0873715342896741e3f50e68c43d8626/.zshrc#L5).

   [![](https://user-images.githubusercontent.com/10276208/36086434-5de52ace-0ff2-11e8-8299-c67f9ab4e9bd.gif)](https://github.com/denysdovhan/spaceship-prompt#----website-----install-----features-----options-----api--)

4. The last step is to change the Zsh theme. Set `ZSH_THEME="spaceship"` in
   `~/.zshrc`. The `.zshrc` file is loaded on startup by Zsh.

## Final Words

We have seen how to configure the command prompt using Zsh, Oh My Zsh, and
Spaceship. In my opinion, it is essential to have a well-configured prompt when
working in the terminal. Also, I would strongly recommend using
[iTerm2](https://www.iterm2.com/) over the default Terminal application due to
its more sophisticated panes management, path selection, and more.

Feel free to reach out to [me](https://twitter.com/_aaronang) with comments,
questions, and feedback. My Zsh configuration can be found on
[GitHub](https://github.com/aaronang/dotfiles).
