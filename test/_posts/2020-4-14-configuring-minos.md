---
title: Configuring Minos
date: 2020-4-14 12:00
categories:
  - Documentation
tags:
  - Minos
---

[![forest](/assets/img/audio-console.jpg)](/assets/img/audio-console.jpg)Minos employs a prioritized configuration system to ensure flexibility and integrity of the configurations. With Minos, you can customize your site for every post and language variant without worrying about breaking the compilation. Minos will also remind you of any missing configurations if you intend to enable some features.

<!-- more -->

## Theme configurations

The `_config.yml` file at the theme’s root contains configurations mostly relate to the layout and plugins. Configuration options, their meaning and default values are described in the `_config.yml.example` file. Some complex configurations, like `search`, `share`, `comment` and `plugins`, will also be explained with details in the following documentation.

<blockquote class="colorquote info">
**Related posts**
1. Setting up a Commenting Service
2. Enable Search Engine Integration in Minos
3. Grow Your Audience with Share Buttons
</blockquote>

## Language variant of theme configurations

When you are creating a website which is served in several languages, you may want to make sure certain page elements are display in appropriate language or some plugins to be switched to localized ones. Minos provides the language variant feature to help you do that. Simply create `\_config.<language_name>`.yml besides theme’s `\_config.yml` and change the configurations you want. Every time files for a specific language is going to be generated, Minos will look for the values in the `\_config.<language_name>`.yml file of that language and override same configurations in the default `\_config.yml`. For more information on how to set up multiple language support, please refer to the Guide to Multiple Language Support in Minos.

Example: localize navigation menus
