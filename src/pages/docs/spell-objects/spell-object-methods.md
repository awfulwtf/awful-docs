---
title: Spell Object Methods
---

# What are they

Spell Objects contain some very useful methods (object-oriented functions) that allow you to cast the underlying spell in many different ways, simple and complex. They also contain methods that help organize and structure your code by spell in some super neat ways.

## Quick example

- `:Cast`, `:Callback`, and `:Castable` are all methods used below

```lua
local mortalStrike = awful.NewSpell(12294, { damage = "physical" })
local sharpen = awful.NewSpell(198817)

-- cast method
if mortalStrike:Cast(target) then awful.alert("Mortal strike!", mortalStrike.id) end

-- some callback methods
sharpen:Callback("pre-ms", function(spell)
  -- fires an alert about the pre-ms sharpen
  return spell:Cast() and alert("Sharpen Blade (MS)", spell.id)
end)

mortalStrike:Callback("prio", function(spell)
  if not spell:Castable(target) then return end
  -- pre-sharpen when MS is castable
  sharpen("pre-ms")
  return spell:Cast(target)
end)

mortalStrike("prio") -- invoking that callback function, will execute clean sharpen+ms
```

# Methods

## Callback

> Powerful organization & performance tool. Allows us to set up concise, modular sets of conditions & actions regarding the spell to be called upon elsewhere.

```lua
spell:Callback([key,]callback)
```

- When at least one `:Callback` is configured, **calling** the spell object like so `spell(key)` will **invoke the callback function behind that key** (if any)
  - You can have one Callback per spell with **no key**, to be invoked when calling the spell with no key
  ```lua
    spell:Callback(function(spell) return spell:Cast() end)
    spell() -- invoking the keyless callback
  ```
  - Other Callbacks **must have a key** to be invoked
  ```lua
    spell:Callback("test", function(spell) return spell:Cast() end)
    spell("test") -- invoking spell's "test" callback
  ```
- When **calling** your spell object, the callback function **will not be invoked if the spell is on cooldown, or you don't have the resources to use it.**
- It's possible to perform literally **any** actions within, including casting other spells, but keeping it related to the spell and the true purpose of the callback is ideal.
- The callback function is passed the spell object itself as first argument

  - It can also receive more arguments if you set up more parameters. It's a normal function!

    ```lua
    -- setting up another param "obj" in our callback function
    spell:Callback("low hp", function(spell, obj)
      -- only cast when given object exists and is below 35% hp!
      if not obj.exists or obj.hp > 35 then return end
      return spell:Cast(obj)
    end)

    -- passing 2nd arg when invoking
    spell("low hp", focus) -- cast on focus target
    spell("low hp", target) -- cast on target
    ```

- Using `:Callback` enables powerful debugging and performance tools like `hookSpellCallbacks` and `hookSpellCasts`

> See also: `Callbacks` (Shown in example below)

### Examples

```lua
-- flayed shot on best target - don't do it to hunters :P
flayed:Callback("best target", function(spell)
  if barbed_next_gcd then barbedAlert() return end
  if target.class2 ~= "HUNTER" then
    -- no blur
    if target.buff(198589) then return end
    return spell:Cast(target, {face = true}) and alert("Flayer's Mark", spell.id)
  else
    pets.loop(function(pet)
      if not pet.enemy then return end
      return spell:Cast(pet, {face = true}) and alert("Flayer's Mark (Pet - " .. pet.name .. ")", spell.id)
    end)
    enemies.loop(function(enemy)
      if enemy.bcc or enemy.isUnit(target) or enemy.isUnit(trapTarget) then return end
      -- no blur
      if enemy.buff(198589) then return end
      return spell:Cast(enemy, {face = true}) and alert("Flayer's Mark (" .. enemy.class .. ")", spell.id)
    end)
  end
end)

-- calling it in the actor
actor:Init(function()
  -- now it will find the best target and cast flayed on them!
  flayed("best target")
end)
```

```lua
-- concussive shot
local function dontConc(unit, overlap)
  overlap = overlap or 0
  return player.buff(camo.id)
  or not unit.enemy
  or unit.immuneSlow
  -- unit already in cc
  or unit.ccr > overlap
end

conc:Callback(function(spell, unit)
  if dontConc(unit) then return end
  return spell:Cast(unit) and alert("Conc " .. unit.classString .. " (Trap Pursuit)", spell.id)
end)

conc:Callback("bad position", function(spell, unit)
  if dontConc(unit, buffer) then return end

  local bpUnit = unit.isUnit(target) and enemyHealer or unit.isUnit(enemyHealer) and target or {}
  local badPosition = bpUnit.exists and (not unit.losOf(bpUnit) or unit.distanceTo(bpUnit) > 40)

  if not badPosition or unit.isUnit(bpUnit) then return end

  return spell:Cast(unit) and alert("Conc " .. unnit.classString .. " (Bad Position)", spell.id)
end)

-- now we can call these!
conc("bad position", focus) -- will use our bad positioning logic
conc(focus) -- will use our basic logic
```

### Callbacks Example

```lua
kill:Callbacks({
  anyone = function(spell)
    enemies.loop(function(enemy)
      if enemy.hp > 20 or enemy.buff(198589) then return end
      return spell:Cast(enemy, {face = true}) and alert("Kill Shot (Execute)", spell.id)
    end)
  end,
  execute = function(spell)
    if target.hp > 20 or target.buff(198589) then return end
    return spell:Cast(target, {face = true}) and alert("Kill Shot (Execute)", spell.id)
  end,
  proc = function(spell)
    if not player.buff(flayers_mark) or target.buff(198589) then return end
    return spell:Cast(target, {face = true}) and alert("Kill Shot (Proc)", spell.id)
  end
})

actor:Init(function()
  local function ks()
    return kill("anyone")
    or kill("execute")
    or kill("proc")
  end
  ks()
end)
```

## Update (old)

> Legacy version of :Callback

- less features, less performant
- kept for legacy routine compatibility

```lua
spell:Update(function(spell, key)
  if key == "test" then
    return spell:Cast(target)
  end
end)

spell("test")
```

# Casting Methods

## Cast

> Checks if the spell is castable, then attempts to cast it. Returns true if cast attempted.

```lua
spell:Cast(unit, options) -- both params are optional
```

- Accepts **[spell object traits](spell-object-traits)** as 2nd arg (1st if no unit) if you need specific instances of Cast to behave differently than others, such as force-facing the unit in important conditions.
  - There are some **alternate traits** `:Cast` accepts which spell objects do not:
  ```lua
  { stopMoving = true } -- stops moving to begin the cast
  { face = true } -- force face the object if ready to cast but not facing
  ```
- Checks that the spell is [`:Castable`](spell-object-methods?id=castable) before casting.
- Causes `:Cast` to avoid attacking into immunities against the given damage type.

```lua
-- physical damage
{ damage = "physical" }
-- magic damage
{ damage = "magic" }
```

## Castable

> Returns true if the spell is castable on given unit with given options.

```lua
spell:Castable(unit, options) -- both params are optional
```

- The following is checked (in order) to determine castability of spell:
  - **player is not falling** (only with **mustBeGrounded** trait)
  - **player has required buff(s)** (only with **requiresBuff** trait)
  - **if unit is given:**
    - **unit must exist**
    - **unit must not be dead**
    - **unit does not have roar of sac** (only with fire blast)
    - **unit is not immune** (based on **[immunity traits](spell-object-traits)**)
  - **spell cooldown must be <= [`spellCastBuffer`](toolbox-general?id=spellcastbuffer)**
  - without **pet** trait:
    - **must not be casting or channeling** (unless **ignoreCasting** / **ignoreChanneling** trait set)
  - with **pet** trait:
    - **pet must not be in cc**
  - without **pet** trait:
    - **player must not be in cc** (only without _ignoreControl_ trait)
    - **player must not be in stun** (only without _ignoreStuns_ trait)
  - **if unit is given:**
    - spell must be **known** and **usable** (enough resources, learned, etc.)
    - **if cast time of the spell is > 0:**
      - if **player is moving**, must have **one** of the following:
        - **ignoreMoving** trait
        - movable while casting buff
    - if **out of range**, must have **one** of the following:
      - **ignoreRange** trait
    - if **out of LoS**, must have **one** of the following:
      - **ignoreLoS** trait
    - if **not facing** the unit, must have **one** of the following:
      - **face** trait
      - **heal** trait
      - **ignoreFacing** trait
      - **pet** trait

```lua
if spell:Castable(target) then
  alert("accordin' to my calcurlationz, we can cast it!")
end
```

## AoECast

> Casts an AoE spell at given object or coords

```lua
-- accepts 3d coords
spell:AoECast(x,y,z)

-- or awful object
spell:AoECast(unit)
```

- Casts directly at the coords [of the unit] given
- Generally makes no modifications to the coords or anything, just does a direct cast -> click operation as smoothly as possible.
  - Some exceptions rarely apply when passing awful object, like minor bug fixes baked in for some weirdly positioned PvE bosses
- Also checks for trait-assigned immunities when given an awful object

```lua
if heroicLeap:AoECast(target) then
  alert("nice!")
end
```

## SmartAoE

> Finds ideal position to cast the spell based on current conditions and given options, then casts it.

```lua
-- passing awful object
spell:SmartAoE(unit, options)

-- passing position
spell:SmartAoE({x, y, z}, options)
```

- Returns **{boolean}** "casted", whether or not the AoE cast was attempted
- Checks `:ShouldCast` (basically `:Castable` without any range, LoS, or facing restrictions) before committing to the cast
- Requires [diameter or radius](spell-object-traits?id=diameter-radius) trait to function as intended
- Default Behavior:

  - Casts at the position given when possible. If out of LoS or range, will offset the cast as much as necessary to reach castability, so long as the unit or coords are still within the bounds of the AoE.

- Parameters:

  - 1.) Awful Object or a table containing `{x, y, z}` coordinates
  - 2.) Options **{table}**, optional - List of options that vastly alter the positioning decision of SmartAoE

    - viable options, all of which are **completely optional**. these can also be stored in your [spell object traits](spell-object-traits) as defaults for SmartAoE:

      - **offsetMin** {number}, minimum offset from given pos (default: **0**)
      - **offsetMax** {number}, maximum offset from given pos (default: **radius**)
      - **distanceSteps** {number}, number of steps between min and max dist (default: **24**) ...btw, the smallest allowable distance step is 0.5yd - short min/max offset deficits with lots of unnecessary distance steps will be ignored for obvious performance reasons
      - **circleSteps** {number}, number of positions to examine in a circle around each distance step (default: **48**) ...higher = more performance hungry but higher accuracy and precision
      - **movePredTime** {number}, if passed an object (or filter), will perform calculations using predicted position of object(s) based on linear movement over this duration instead of current position
      - **sort** {function}, when sort is configured, you can control the final sorting of valid cast positions, of which it will choose the top in the list.

        ```lua
        -- we use this later
        local dist = awful.Distance

        -- ursol spell object
        ursol = NewSpell(102793, {
          effect = "magic",
          slow = true,
          diameter = 8
        })

        -- ursol kill target *away* from nearby aoe defensive
        -- e.g, darkness, AMZ, earthen wall, barrier, link ..
        -- (AoEDefensive is from my routine, finding the right area trigger)
        local x, y, z = AoEDefensive.position()
        if feral.ursol:SmartAoE(target, {
          movePredTime = awful.buffer,
          sort = function(t, b)
            -- sort valid positions by furthest away from the defensive
            return dist(t.x, t.y, t.z, x, y, z) > dist(b.x, b.y, b.z, x, y, z)
          end
        })
        ```

      - **filter** {function}, calls this function for all OM units at each simulated cast position that still hits the primary unit/position to keep a count of **filter hits**. searches for a cast position that is below your **maxHit** threshold

        - it will call the function **several times for each enemy & friendly unit / player** in awful OM
        - you must be extremely careful what you do inside of it to avoid performance issues
        - performance is `O(n * (#units * ( distanceSteps * circleSteps )))` - **careful what you do in there**!
        - the following args are passed for each object, repeated until it finds the optimal position:
          - **argument 1**: the awful object, each is passed to your function one by one
          - **argument 2**: the object's est. distance to the cast position planned at time of query
          - **argument 3**: the planned AoE cast position itself `{x, y, z}` at time of query
        - each `true` return will add `1` to the **hit count**
        - each **non-boolean return of value** (string, number, etc,) will mark the unit to have the AoE positioned as far as possible from them, without affecting the actual hit count
        - filter function example:

        ```lua
        {
          filter = function(obj, estDist, castPosition)
            -- filter out friends who have UA for mass dispel
            if obj.friendly and obj.debuff('unstable affliction') then
              -- already in radius, we are going to hit them. return true to add 1 to hit count
              if estDist <= radius then return true end
              -- close enough to potentially hop in, should angle it away from them. returning non-bool value to tell it to avoid this unit.
              if estDist <= radius * 2 then return "avoid" end
            end
          end
        }
        ```

      - filter function specific traits:
      - **maxHit** {number}, the maximum acceptable filter hit count to still cast the spell (default: **0**)
      - **ignoreEnemies** {boolean}, do not add enemies to `units` table for filter function - will only check friends. very important to add this if enemies are not relevant to your filter function.
      - **ignoreFriends** {boolean}, do not add friends to `units` table for filter function - will only check enemies. very important to add this if friends are not relevant to your filter function.
      - **units** {table}, iterative array of awful objects, if you want to explicitly pass a list of objects to filter through (keep in mind, **you should only pass this trait at cast time**, not when initializing new spell object, otherwise the list will become stale)

### Examples:

```lua
-- ring of frost, perfectly edged on the target, and automagically casted around pillars!
local rof = awful.NewSpell(113724, {
  effect = 'magic',
  cc = true,
  diameter = 12,
  offsetMin = 4.5,
  offsetMax = 5.5
})
ringOfFrost:SmartAoE(focus)

-- mass dispel sheep around a corner!
local massDispel = awful.NewSpell(327830, {
  diameter = 30
})
massDispel:Callback('sheepy', function(spell)
  group.loop(function(friend)
    if not friend.debuff('polymorph') then return end
    if not spell:SmartAoE(friend) then return end
    return awful.alert(spell.name .. ' (Sheepy Sheep)', spell.id)
  end)
end)
massDispel('sheepy')
```

## SmartAoEPosition

> Returns the position at which **SmartAoE** has decided to cast, if any.

- **SmartAoE** is essentially just this 3 step process:
  - 1. checks `ShouldCast`
  - 2. grabs coords from `SmartAoEPosition`
  - 3. casts at the position with `AoECast(x, y, z)`

```lua
local x, y, z = spell:SmartAoEPosition(unit, options)

local x, y, z = spell:SmartAoEPosition({x,y,z}, options)
```
