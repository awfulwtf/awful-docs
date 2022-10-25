import Callout from 'nextra-theme-docs/callout'
import Link from 'next/link'

# What's a namespace?

- Namespaces act as a modular, self-contained scope (**table**) to the identifiers (**variables**) inside of it. These identifiers can represent **functions**, **tables**, or **any other value type** in Lua. They are essentially **modules** containing all of these things packaged together, in a way that will not interfere with anything outside of them.

> > ```lua
> > local Unlocker, awful, project = ...
> > ```
>
> - Example of **importing** the 3 common namespaces into your file. You are **destructuring** varargs (**...**) passed to your file, and **declaring upvalues** for each namespace within. Now you have access to all functions, tables, values, etc. made available by `awful`!
>
> **note:** This is just declaring local variables. You aren't restricted to what you name them. If you want to access awful API via `af` instead of `awful` for example, you can!

If you are familiar with web development, this is similar to **state management** often handled by libraries such as Redux, but a lot simpler to use.

## What's the purpose?

> - The **entire framework** is made available within **one table**.
>
> - Using namespaces ensures your code will **never** interfere with addons or other routines.
>
> - You can **organize your project however you see fit**, have as many folders and files as you want, and **easily maintain all of your own API / data** within your namespace.
>
> - When you make a change to your namespace in one file, it is **immediately reflected in all others**.

# Common Namespaces

## Unlocker

### The first namespace passed to each file by awful.

- On an unlocker like Tinkr, you'll find the unlocker's API within. On most others, like Daemonic, its only purpose is to inform you which unlocker is in use.

> The unlocker name is always available as a string in camelCase under `Unlocker.type`, so if you are doing anything unlocker-specific, outside of the scope of the framework, you can follow [best practices](best-practices.md) by checking the unlocker type first to ensure compatibility across all platforms.

**`Unlocker.type : nil | "daemonic" | "unlockerName"`**

```lua
-- this is kinda pseudocode fyi
local Unlocker, awful, project = ...

-- adding some api to our project to run protected funcs on either unlocker
function project.runProtected(f, ...)
    -- run some protected function on tinkr
    if not Unlocker.type then
        local Eval = Unlocker.Util.Evaluator
        return Eval:CallProtectedFunction(f, ...)
    -- or do it differently on daemonic!
    elseif Unlocker.type == "daemonic" then
        return CallProtectedApi(f, ...)
    end
end

if Unlocker.type == "daemonic" then
    print("doing daemonic stuff!")
end
```

## awful

### The second namespace passed to each file by awful.

- #### Look!!! That's my namespace!!! ![pugpls](https://i.pinimg.com/originals/01/d9/a4/01d9a44af5aa852624b87f8f280f4942.gif ":size=40")

> I'm sure you've already caught on by now, but **all awful API referenced in these docs will be found within this namespace**.

```lua
local unlocc, awful, memes = ...

print(awful.hello)
```

## project

### The third namespace passed to each file by awful.

- #### This one is special compared to the others, and it's all yours!

> This namespace is made available to **your project and only your project**. It allows you to **build out your own extensive API**, **store and access data and functions between your other files**, and **expose variables to awful to unlock magic capabilities, such as syncing settings from the [Web GUI](web-gui.md)**.

```lua
local Unlocker, awful, McDonalds = ...
local colors = awful.colors

function McDonalds.Print(str)
    print(colors.red .. "[McDonalds]:", colors.yellow .. str)
end

function McDonalds.CreateOrder(order)
    order.append({
        type = "Cheeseburger",
        lettuce = true,
        pickles = false,
    })
    McDonalds.Print("Your order is ready, sir.")
    return order
end
```

- Other awful projects get passed their own namespace and won't interfere with the one passed to your project if they're loaded simultaneously.

- If you set up multiple projects (requires new file in **awful/routines** folder) you will receive a separate namespace for each one.
