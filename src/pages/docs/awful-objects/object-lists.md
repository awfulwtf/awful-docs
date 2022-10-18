---
title: Awful Object Lists
---

## What are they?

> They're arrays containing awful objects and their expected [attributes](object-attributes) and [functions](object-functions). Each list is filtered based on its own specific criteria, which is described below for each one.

### Performance

> Most lists remain completely empty until referenced. They're generated on-demand by filtering the unlocker's OM, then cached for constant time re-reads the rest of the current 'tick'.

### Freshness

> You must always grab lists fresh where you need them. You can't declare them locally outside of your working scope like you can [static objects](/static-objects.md), or they'll become stale. Generally you'll wanna access them directly from the awful namespace, e.g, `awful.enemies`. Though there are a couple of exceptions where they can be accessed by name directly (like `enemies` or `group`), namely inside the **Routine Actor** and your Spell Object **:Callback** functions.

### Magic Methods

> Object Lists contain several **Magic Methods** which allow you to do powerful searches, iterations, and more with the objects contained. Some examples:
>
> [around](/object-lists.md?id=around): finds objects from the list that are within a given distance of another awful object
>
> [loop](/object-lists.md?id=loop): an iteration alternative to standard **for loops**, allowing you to mimic and reap the benefits of a [**continue statement**](https://www.geeksforgeeks.org/continue-statement-cpp/) to write cleaner, significantly less indented ~~spaghetti~~ code.
>
> We go over the rest at the end of this section, so stick around.

# Lists

## group

Other players in our party or raid, **not including the player**.

> See also:
>
> **fgroup** | Players in our group, **including the player**. (fullGroup)

- **Everywhere:** Players in your party or raid.

```lua
-- mega basic rejuv
rejuvenation:Callback(function(spell)
    group.loop(function(friend)
        -- guard clause for members who already have rejuv.. ('continue' to next unit in the loop)
        if friend.buffRemains(spell.id, player) > 4 then return end
        -- otherwise rejuv & break loop on successful cast
        return spell:Cast(friend)
    end)
end)
```

## enemies

Contains enemy units that are relevant to the player's current environment.

- **Arena / Battleground:** Enemy players only.

- **PvE / Open World:** Enemy **units** that are in combat, or enemy **players** that are targeting or attacking the player.

```lua
-- basic corruption maintenance on enemies
awful.enemies.loop(function(enemy)
    -- dbr = debuffRemains
    if enemy.dbr(corruption.id, 'player') < 3 then return end
    return corruption:Cast(enemy)
end)
```

## friends

Contains all friendly players within render distance.

- **Everywhere:** All friendly **players**, even ones that are not in your group. This can be a needlessly large list in the open world.

```lua
-- casting some heal on any friend below 40%
awful.friends.loop(function(friend)
    if not friend.combat or friend.hp > 40 then return end
    return spell:Cast(friend)
end)
```

## totems

Contains enemy totems or related objects (PvP).

> **tip:** the list of totems and corresponding object IDs that populate this list can be found in `lists.lua` near awful loader.

- **Everywhere:** All enemy totems, psyfiend, banner, etc. Totems flagged as dead or despawning but still visible are automatically filtered out.

```lua
awful.totems.stomp(function(totem, uptime)
    -- only totems that have been up for 300+ms
    if uptime > 0.3 then return end
    -- stomp 'em
    return spell:Cast(totem)
end)
```

## seeds

Contains only living night fae wildseed units.

- **Everywhere:** Living night fae wildseed units. Both friendly and enemy seeds are in the list.

```lua
-- some auto enemy wildseed targeting and stomping!
awful.seeds.track(function(seed, uptime)
    -- only enemy seeds
    if not seed.enemy then return end
    -- auto target it
    if not seed.isUnit(target) then seed.setTarget() end
    -- only seeds that have been up for 300+ms
    if uptime > 0.3 then return end
    -- stomp 'em
    return spell:Cast(seed)
end)
```

## explosives

Contains M+ affix explosive objects

```lua
someSpell:Callback("kill explosives", function(spell)
    awful.explosives.loop(function(explosive)
        return spell:Cast(explosive)
    end)
end)
```

## shades

Contains M+ affix spiteful shade objects

```lua
someSpell:Callback("kill shades", function(spell)
    awful.shades.loop(function(shade)
        return spell:Cast(shade)
    end)
end)
```

## objects

Contains all objects of type `GameObject`

```lua
-- interact with soulwell
awful.objects.loop(function(obj)
    if obj.name == "Soulwell" then
        obj:Interact()
    end
end)

-- find some quest object
local quest_object_id = 123
awful.objects.loop(function(obj)
    if obj.id == quest_object_id then
        print("we found our thingy!")
        return true -- breaks the loop
    end
end)
```

## triggers

Contains all objects of type **area trigger**, both freindly and enemy.

```lua
-- find enemy freezing trap (idk if the ID is correct lol)
awful.triggers.loop(function(trigger)
    -- continue to next object if this one isn't freezing trap
    if trigger.id ~= 187650 then return end

    -- do stuff with the trap
    local x,y,z = trigger.position()
    draw:Circle(x,y,z,2.5)
end)
```

## units

Contains all objects of type **unit**, both friendly and enemy.

- **Everywhere:** All objects of type **unit**.

## pets

Contains all units that classify as another player's pet, both friendly and enemy.

- **Everywhere:** All units that are pets, based on on WoW's `UnitIsOtherPlayersPet`

## players

Contains all objects of type **ActivePlayer**, both friendly and enemy.

## allEnemies

Contains all enemy units/players regardless of their combat status

```lua
-- check if we're gonna end up pulling any mobs with our aoe before casting it
local ooc = function(obj) return not obj.combat end
aoeSpell:Callback(function(spell)
    -- guard clause for casting the spell when it would pull any OOC enemies
    if allEnemies.around(player, 10, ooc) > 0 then return end
    return spell:Cast()
end)
```

## wwClones

Contains windwalker clones (from storm, earth, and fire)

## tyrants

Contains Demonic Tyrants summoned by warlocks

## rocks

Contains enemy Earth Elementals (dwayne [the rock] johnson(s))

```lua
-- haha now you have to type awful rocks :P haha xd
awful.rocks.loop(function(rock)
    if rock.target.isUnit(player) then
        print("there's a fucking rock attacking me bruv")
    end
end)
```

## imps

Contains enemy warlock imp pets [mainly added so i could just check `#awful.imps` to know if lock was playing imp]

# **Magic Methods**

> They're available for **every single awful object list**
>
> You can make them available to a normal indexed array with `awful.immerseOL(table)`
>
> All **Magic Methods** return `true`, so you can weave them into conditional statements if you want

## around

> Find the number of units around a unit or position
>
> You can set specific criteria (filter) they must meet to be added to the count
>
> Receive a new list back with the units around

```lua
local count, total, objects = list.around(unit, distance, criteria)
```

- Parameters:
  - 1. **unit** (awful object) or **position** `{x, y, z}`: **required** - the unit or position to check that objects in the list are around
  - 2. **distance**: {number}, **required** - the distance from the given unit/position an object must be within to be added to the count
  - 3. **criteria**: {function}, optional - criteria to check against each object before adding them to the **main count** and **objects list**
- Returns:
  - 1. **main count**: {number}, the number of units around who met the criteria (if any)
  - 2. **total count**: {number}, the total number of units around, even if they did not meet the criteria
  - 3. **objects**: {array}, array of objects that were around and met criteria (if any)

### Examples:

```lua
-- checking breakable cc around me for brutal slash
local bcc, bsCount = enemies.around(player, 8, function(obj) return obj.bcc end)
-- now we know 0 bcc is around, but we also hit 2 targets with bslash
if bcc == 0 and bsCount >= 2 then
    brutalSlash:Cast()
end

-- checking breakable cc around expected stomp position
local bcc = function(obj) return obj.bcc end

local stompPos = function(unit)
  if not pet.exists then return unit.position() end
  local px,py,pz = pet.position()
  if pet.rooted then return px, py, pz end
  local x,y,z = unit.position()
  local angle = awful.AnglesBetween(x,y,z,px,py,pz)
  local reach = unit.combatReach
  return x + reach * cos(angle), y + reach * sin(angle), z
end

local sx, sy, sz = stompPos(target)
if enemies.around({sx, sy, sz}, 12, bcc) == 0 then
    barbedShot:Cast(target)
end
```

## filter

> The filter method creates a new object list containing all objects that pass the test implemented by the provided function.

```lua
local enemyMelee = enemies.filter(function(obj)
    return obj.role == "melee"
end)

enemyMelee.loop(function(obj)
    -- do stuff with melee objects
end)
```

## loop

> Iterate the object list, calling the provided function for each object.
>
> When any truthy value is returned, the loop will break.

- Function is passed 3 arguments:
  - 1. **object** each object in the list
  - 2. **index** current index in the iteration
  - 3. **uptime** the amount of time since we first iterated over this object (**0** for new object detections)
- Arguably better solution than **for loops** for iterating object lists.
  - Allows you to mimic the functionality of a [continue statement](https://www.geeksforgeeks.org/continue-statement-cpp/), an invaluable tool not available to Lua, by simply closing eliminating conditions with a **return**
  - This (on average) reduces code spaghetti by a breathtaking 42.069%.
  - Fr tho, way less indenting. Check the example below.
- Check [best practices - spaghettification](best-practices?id=spaghettification) for more tips on reducing spaghetti-sauce in your code.
- `forEach` is a valid alternate key for the same method

```lua
-- this code is already over-indented, but it can get way crazier real fast
for _, unit in ipairs(list) do
    if unit.enemy and unit.distance < 40 then
        if not unit.immuneMagic and unit.los then
            if not unit.isUnit(target) then
                if hotStreak or combustion then
                    if not unit.facing(player) then
                        if helpMePlease then
                            if spell:Cast(unit) then
                                awful.alert("Casted the thing!", spell.id)
                                break
                            end
                        end
                    end
                end
            end
        end
    end
end

-- this accomplishes the exact same thing, it's just way easier to work with
-- ...for both the eyes and fingies when we need to move things around!
list.loop(function(unit)
    if not hotStreak and not combustion then return end
    if not unit.enemy or unit.distance > 40 or not unit.los then return end
    if unit.immuneMagic or unit.isUnit(target) then return end
    if unit.facing(player) or not helpMePlease then return end
    return spell:Cast(unit) and awful.alert("Casted the thing!", spell.id)
end)

-- also, has those neat extra features baked in for free :)
awful.friends.loop(function(unit, i, uptime)
    if uptime == 0 then
        print("New unit detected: " .. unit.name .. ", they're a " .. unit.classString)
    end
end)
```

![lol](lol.png)

## stomp

> Very similar to `loop`, but with a couple of key differences:
>
> 1.) Eliminates totems that are stuck at 1 hp or in the process of despawning from the iteration.
>
> 2.) Does not give back `index` - only `object` and `uptime`

```lua
awful.totems.stomp(function(totem, uptime)
    if uptime < 0.25 then return end
    if totem.hp < spell.damage * 2 then
        spell:Cast(totem) -- noice!
    end
end)
```

## sort

> Sorts the list using basic Lua `table.sort`
>
> Not very performant, should be used sparingly.

```lua
awful.enemies.sort(function(x,y) return x.hp < y.hp end)
```
