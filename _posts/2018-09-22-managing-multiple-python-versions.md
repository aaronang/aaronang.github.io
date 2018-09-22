---
layout: post
title: "Simple Python Version Management"
description: "Pyenv is a Python version management tool that enables the
developer to have multiple Python versions installed."
keywords: "python, pyenv"
---

Often, we are working on multiple software projects simultaneously that require
different Python versions. I would like to talk about how I manage multiple
Python versions with [pyenv](https://github.com/pyenv/pyenv).

## Problem

Let's assume we are working on two Python projects. In the first project, we are
doing image classification to distinguish cats and dogs. In the second project,
we are doing image classification to identify digits. For no particular reason,
the first project is using Python 3.4 and the second project is using Python
3.7. On Ubuntu 16.04, there is no official support for Python 3.7.

- **How do we obtain Python 3.7?**
- **How do we easily switch between Python 3.4 and Python 3.7?**

## pyenv

From [pyenv's README](https://github.com/pyenv/pyenv):

> pyenv lets you easily switch between multiple versions of Python. It's simple,
> unobtrusive, and follows the UNIX tradition of single-purpose tools that do
> one thing well.

## Installing pyenv

In terminal, use the [pyenv-installer](https://github.com/pyenv/pyenv-installer)
to install pyenv:

```console
$ curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
```

Then, append the following lines to your `.bashrc`:

```bash
export PATH="~/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

## Using pyenv

In terminal, to install Python 3.7.0:

```console
$ pyenv install 3.7.0
```

To list all available Python versions:

```console
$ pyenv install --list
Available versions:
  2.1.3
  2.2.3
  2.3.7
  2.4
  2.4.1
  2.4.2
  2.4.3
  2.4.4
  2.4.5
  2.4.6
  2.5
  2.5.1
  ...
```

In the cat vs. dog classification project, we can set the local Python version:

```console
$ pwd
/tmp/catdog
$ pyenv local 3.4.9
$ python --version
Python 3.4.9
```

In the digit classification project, we can use Python 3.7:

```console
$ pwd
/tmp/digits
$ pyenv local 3.7.0
$ python --version
Python 3.7.0
```

> Note: A `.python-version` file, which stores the Python version as a string,
> is created when using the `pyenv local` command.

## Closing Words

pyenv is just a solution that works well for me. In the research community, a
very popular way of installing Python is using
[Anaconda](https://www.anaconda.com/), which comes with
[Conda](https://conda.io/docs/) --- a package, dependency and environment
management tool. I strongly recommend you to dig deeper in pyenv or Conda.
