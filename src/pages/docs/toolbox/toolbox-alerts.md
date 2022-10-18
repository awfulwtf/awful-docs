---
title: Alerts & Visuals
---

These are our visual tools that may help to keep the user aware of what's happening, in style.

- These functions are located directly under the `awful` namespace.

# **alert**

Displays a toast alert for the user.

![alerts](gifs/alerts.gif)

- Trying to recreate an identical alert while it's still displayed will just extend the duration, so feel free to spam it while it's relevant!

- We included a lot of customization options so you can get the tone & delivery of your message across clearly, but we also want to keep the theme consistent with other alerts.

- You can opt for as much or as little customization as you want. All that is required is a message, even the texture is optional.

- Always returns true so you can include it as part of your conditional expressions for cleaner code.

```lua
awful.alert([message / {options}], [texture]) : true
```

Options:

> `message` _string_ - The message of your alert.

> `texture` _integer_ - SpellID to use as the texture for this alert.

> `duration` _float_ - Lifespan of the alert (not including fade in and fade out animations)

> `fadeIn` _float_ - Duration of the fade in animation. Default 0.175 (cubic-bezier easing)

> `fadeOut` _float_ - Duration of the fade out animation. Default 0.3 (cubic-bezier easing)

> `bgColor` _array_ - The rgb[a] color value (0-1) of the texture background (essentially the shadow, the "mood" of the alert) inside of an array. { r, g, b [,a]}

> `imgX` _float_ - Number of pixels to move the texture on the X axis behind the circular mask.

> `imgY` _float_ - Number of pixels to move the texture on the Y axis behind the circular mask.

> `imgScale` _float_ - The scale of the texture behind the circular mask.

- **Here are some example alerts. I encourage you to `/run` them in-game and see how they look.**

```lua
-- nice basic alert, just some text
awful.alert("hi mom")

-- adding a spell texture to the mix.
awful.alert("Sheepy Sheep", 118)

-- some text colors
awful.alert("Sheepy? "..awful.colors.red.."NO.", 118)

-- now a red background to go with that. we'll have to use options now.
awful.alert({
    message = "Sheepy? "..awful.colors.red.."NO.",
    texture = 118,
    bgColor = awful.rgbColors.red
})

-- passing our own custom colors... the color escape won't work through /run in chat. you'll have to write & run this from your routine to test it.
awful.alert({
    message = "Sheepy? |cFF5c9affYES!",
    texture = 118,
    bgColor = {30/255, 60/255, 120/255, 0.95}
})

-- let's see what Meteor looks like...
awful.alert("Meteor!", 153561)

-- hmm, i don't like how the meteor itself is cut off by the mask. i want to move it up and to the left a bit. maybe scale it down too.
awful.alert({
    message="Meteor!",
    texture=153561,
    imgX = 1,
    imgY = 0.55,
    imgScale = 0.875
})
-- nice, that's much better...
```

## textureEscape

Converts spellID or texture ID into a texture escape sequence string for use in alerts, other frames, or prints.

```lua
awful.textureEscape(spellID/FileDataID[,size,offsets])
```

```lua
-- texture = freezing trap spellID
-- size 16px
-- offsets "x:y", here am moving it up 2 pixels
local trap = awful.textureEscape(187650, 16, "0:2")

-- now gonna alert and print this
awful.alert(trap .. " the healer!", 187650)
print(trap .. " in the chat!")
```
