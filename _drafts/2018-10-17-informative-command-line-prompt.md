---
layout: post
title: "Informative Command Prompt"
description: "How to configure the command prompt to show useful information."
keywords: "zsh, prompt, git"
---

Nowadays, it is hard to imagine software development without Git. However, for
many developers Git is mysterious and has a steep learning curve. I have noticed
that the cause for most confusions around Git is either (1) the lack of fundamental
understanding of Git or (2) being unaware of the current Git state, or both.

In this article we will focus on the second point --- being unaware of the
current Git state. One easy solution is to use `git status` as frequent as
possible. However, as engineers, we are lazy and would like to type as little as
possible. Therefore, **I would like to discuss how I configured the command
prompt such that it shows the Git state at all times, as shown in the image
below**. `master ?` indicates that untracked files are present in the active
`master` branch. The gem stone 💎 indicates what Ruby version is used for the
active project.

![Command prompt](/assets/images/command-prompt.png)

First, what is the command prompt? From [Wikipedia](https://en.wikipedia.org/wiki/Command-line_interface#Command_prompt):

> A command prompt (or just prompt) is a sequence of (one or more) characters
> used in a command-line interface to indicate readiness to accept commands. It
> literally prompts the user to take action. A prompt usually ends with one of
> the characters `$`, `%`, `#`, `:`, `>` and often includes other information,
> such as the path of the current working directory and the hostname.

By default, macOS comes with Bash, Terminal, and the default command prompt:

```
<hostname>:<directory> <username>$ echo Hello, World!
Hello, World!
```

In my setup, I use Zsh, instead of Bash, with [Oh My
Zsh](https://github.com/robbyrussell/oh-my-zsh), a community-driven Zsh
framework for managing Zsh configuration. I don't necessarily think that Zsh is
better than Bash, but I do like the fact that the Oh My Zsh framework comes with
powerful default behavior. For example, when changing to a certain directory in
the terminal using autocomplete, the default behavior of the Oh My Zsh framework
allows me to type the first couple characters without having to care about
capitalization.








For example, when we learn to use Git to do version control, we often start
using it from the terminal. In the beginning, we make a lot of mistakes using
Git and rely heavily on StackOverflow. I have helped many people using Git and
figured that the cause for most confusions is either (1) the lack of fundamental
understanding of Git, or (2) being unaware of the current Git state.

When the command prompt is not configured, it is easy to forget
what branch we are working on. One might commit to the master branch accidentally
