---
title: Toolbox General
---

> awful has a lot of useful tools to help clean up code and make complex tasks easier to perform
>
> i'm throwing them all in here, let's call it **the toolbox**

# **important variables**

## time

> `awful.time`
>
> current time in seconds, equal to `GetTime()`, but only updated when awful framework ticks.

## buffer

> `awful.buffer`
>
> a combination of dynamic values which is roughly equal to **the time it should take for what's displayed on your client to reach the servers, plus 1 tick of buffer for your script to react before it's too late, and 30ms to account for any latency jitter**:
>
> buffer = **latency** + **tickRate** + **jitter**

```lua
-- buffer is used in many places within the framework to dynamically account for latency.

-- here's a quick example of how you can use it yourself:
-- calculating when to time a spell reflection or interrupt at the VERY latest possible moment:
if enemy.castRemains <= awful.buffer then
    if interrupt.cd == 0 and interrupt:Cast(enemy) then
        awful.alert("interrupted thing")
    elseif reflect:Cast() then
        awful.alert("reflected thing!")
    end
end
```

## latency

> `awful.latency`
>
> Your latency to the game server, averaged out over the last 30 seconds, with HTTP overhead accounted for.

## tickRate

> `awful.tickRate`
>
> The time between each awful framework **tick**.
>
> Generally, if an event will happen before `time` + `tickRate`, your script will not 'tick' again to react in time. That's why this is an important variable, it determines how many `ticks` you want to think ahead.
>
> The value always varies for two reasons:
>
> 1.) [Routine Actors](actor) can set a static tickrate, and the rest of the framework will comply with it, but if framerate is too low, the fastest it can run is once per frame.
>
> 2.) If an Actor is running once per frame, the value will still be > 0, roughly equal to the time between each frame `1/GetFramerate()`, but the value is actually calculated each tick (`current tick time` - `last tick time`) then averaged out between the last 5 ticks.

## spellCastBuffer

> `awful.spellCastBuffer`
>
> The Spell Queue Window duration set by awful
>
> This is also the maximum amount of time remaining on GCD or cast time that it will queue the next spell within.

## gcd

> `awful.gcd`
>
> The total expected GCD duration per general 1.5s GCD incurring spell cast
>
> Most spells on GCD incur a base 1.5s cooldown modified by haste, some incur their own shorter one
>
> ```lua
> 1.5 / ( 1 + player.haste )
> ```
>
> see also: Spell Object Attribute `spell.gcd` - the gcd that the queried spell incurs

## hasControl

> `awful.hasControl`
>
> whether or not the player has control of their character

## zone

> `awful.zone`
>
> current zone text

## mapID

> `awful.mapID`
>
> current mapID

## powerTypes

```lua
awful.powerTypes = {
	["mana"] = 0,
	["rage"] = 1,
	["focus"] = 2,
	["energy"] = 3,
	["combopoints"] = 4,
	["cp"] = 4,
	["runes"] = 5,
	["runicpower"] = 6,
	["soulshards"] = 7,
	["shards"] = 7,
	["astralpower"] = 8,
	["ap"] = 8,
	["lunarpower"] = 8,
	["holypower"] = 9,
	["alternatepower"] = 10,
	["maelstrom"] = 11,
	["chi"] = 12,
	["insanity"] = 13,
	["arcanecharges"] = 16,
	["fury"] = 17,
	["pain"] = 18
}
```

# **awesome functions**

## addUpdateCallback

Adds a callback function to the main framework ticker. These are called in the order added, just before the routine actor.

```lua
awful.addUpdateCallback(callback[,enabled])
```

```lua
-- only running while routine is enabled
awful.addUpdateCallback(function()
    print("This is being called a lot, but only while my routine is on!")
end, true)

-- running every tick, all the time
awful.addUpdateCallback(function()
    print("This is being called a lot, all the time!")
end)
```

## bin

Converts value of given expression / variable into binary.

- Any value (bool, string, number, float, function) is 1
- No value (nil, false) is 0.

> bin(**nil / false**) : **0**

> bin(**any value**) : **1**

```lua
awful.bin(conditions) : 1 | 0
```

```lua
local bin = awful.bin

print( bin(player.isPlayer) )
-- 1

print( bin(player.enemy) )
-- 0

print( bin(player.isPlayer) * 30 )
-- 30

print( bin(player.enemy) * 30 )
-- 0

-- example use case: only cast quarter DR sheep if 17.5/18s remains on the DR reset.
if target.incapDR == 1 or target.idrRemains > 14 + bin(target.idr == 0.25) * 3.5 and target.idr >= 0.25 then
    sheep:Cast(target)
end

-- what this would have looked like without bin
if target.incapDR == 1 or target.idrRemains > 14 + (target.idr == 0.25 and 3.5 or 0) and target.idr >= 0.25 then
    sheep:Cast(target)
end
```

## controlMovement

Temporarily disables movement (and optionally facing) input from the player.

```lua
awful.controlMovement(duration[,facing])
```

> see also: `stopMoving` spell:Cast option

```lua
-- somewhere in our actor, using super basic logic to take control of movement to finish a sheep cast
-- only controlling it for 2 frames, so that we
if player.castID == sheep.id and player.castTarget.los then
    awful.alert("Controlling Movement (Sheep)", sheep.id)
    awful.controlMovement(awful.tickRate * 2)
end
```

## controlFacing

Temporarily disables facing input from the player, including right mouse button movement and keyboard turning actions.

```lua
awful.controlFacing(duration)
```

## StopMoving

Immediately stops the player from moving, as long as they're not in the air.

**`awful.StopMoving()`**

## Populate

Creates a reference to each entry within given associative array (Param 1) inside of all other given tables, namespaces, scopes, etc. as well (Params 2 - N)

```lua
awful.Populate(aArray, t1[, t2, t3, t4, t5, ...])
```

> This is a useful tool when used correctly, that allows you to 'merge' references to all values (including functions, objects, tables, etc.) between multiple tables - which can be namespaces, lists of objects, etc.
>
> For example, you can create a list of spells as an associative array like this:
>
> ```lua
> local list = {
>    healingTouch = NewSpell(1234),
>    mightyBash = NewSpell(12345),
>    ...
> }
> ```
>
> Then make a reference to all keys in the list available to other table(s), namespaces, or scopes using Populate, like this:
>
> ```lua
> local actor = project.druid.feral
> local otherList = {}
>
> -- param 1, the list we want to copy references from
> -- all other params are being copied to
> awful.Populate(list, otherList, actor, getfenv(1))
>
> -- now otherList AND actor can access healingTouch & mightyBash!
> print(otherList.mightyBash.cooldown)
> print(actor.healingTouch.id)
> -- also, since we copied to `getfenv(1)`, they're available directly to the scope of this file!
> print(mightyBash.name)
> ```
>
> Note: The key `parent` will be written to each table within the associative array. Mainly to allow objects to find their siblings in the list. For example, all spell objects in a list automatically have direct access to each other within their :Callback function environments after `Populate` is called
>
> **tl;dr**: **This thing puts a copy of all the stuff in one table into other tables**
