import Callout from 'nextra-theme-docs/callout'
import Link from 'next/link'

# How it works

## Load Order:

- By default, awful will search through each folder in your project, and load each file found from root to tail directory. Keep reading for a much better way to define an explicit load order, which I recommend you do as soon as possible.

### Immersion:

- On load, awful immerses your files in a bubble environment that contains most protected API unlocked and modified to be consistent between supported platforms. It also passes you [common namespaces](namespaces.md?id=common-namespaces) to make use of our API and establish your own.

## Understanding Load Order

### Dependencies first

- You should plan an appropriate order for your files to load based on **dependencies** and **dependents**.. Here is a quick example:

### .../project/project.lua (Dependency)

```lua
local unlocker, awful, project = ...

project.print = function(str) print("(epicProject) >", str) end
```

- The above file declares `project.print` as a function when first loaded to make prints from our project fancier!

### .../project/mage/fire.lua (Dependent)

```lua
local unlocker, awful, project = ...
local mage = project.mage

-- routine actor
local fire = mage.fire

-- if player is not mage, stops code below from running
if not fire.ready then return end

-- Fancy Load Print!
project.print('Fire Mage Rotation Loaded')
```

- The above file uses `project.print` to print an OnLoad message for their mage rotation, as long as the player is on a mage.

### Can you guess which one should load first?

#### ...In this example it's clearly `project.lua`, but with a huge project containing many more files, it could become a much harder question to answer!

- We first have to **declare** the `project.print` function (as well as the mage table, our routine actor, etc.) before **using** them in `fire.lua` ... Now you have to consider this for **your own personal project**. Your variables, api, file structure, etc. will be unique to you, and the **sooner** you consider your explicit load order the **better**.

## Configuring Load Order

### Create a load file

> Within your base project directory ( awful/routines/**project** ) folder, you can assign a load order manually with the **load** file. You can give it the **.lua extension** for syntax highlighting, but **either make it .lua or give it no extension, or it will not be recognized.**

- The base directory is your routine folder. The load order is from top to bottom. Here is an example of the contents of a `load.lua` file

```lua
load = {
    "/awful.lua",
    "/mage/mage.lua",
    "/mage/fire_actor.lua",
    "/mage/spells/mage_spells.lua",
    "/mage/spells/fire_spells.lua",
    "/hunter/hunter.lua",
    "/hunter/bm_actor.lua",
    "/hunter/spells/bm_spells.lua",
}
```

> Now the listed files will be loaded from top-bottom.
>
> ⚠️ Important: **This completely replaces the old method of file loading. If you don't list a file here, it won't be loaded by Awful.**
