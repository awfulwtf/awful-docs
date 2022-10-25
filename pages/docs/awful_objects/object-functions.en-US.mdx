import Callout from 'nextra-theme-docs/callout'
import Link from 'next/link'

# Introduction

## What's an object func?

> An object function is a **key** within an [awful object](objects.md) that must be **called** `call()` to return a **value**.
>
> Most functions are **non-case-sensitive** and many have **fallback aliases** for added intuitiveness factor.

## Function Performance

> Functions are **less performant** than **attributes**, as a lot of them cannot / do not use the same caching techniques, but they do not face the same limitations.

# General Functions

## canAttack

Checks if the unit can attack another unit

**`unit.canAttack(otherUnit) : true | false`**

```lua
if target.canAttack(focus) then
    print("My target unit and focus unit don't like each other!")
end
```

## isUnit

Compares the object with another to determine if they're the same.

**`unit.isUnit(otherUnit) : true | nil`**

```lua
if target.isUnit(focus) then
    print("My target unit and focus unit are the same!")
end
```

## friendOf

Checks if the unit is friends with another unit

**`unit.friendOf(otherUnit) : true | false`**

```lua
if target.friendOf(focus) then
    print("My target unit and focus unit are best friends!")
end
```

## hasTalent

Checks if the object has the given talent or PvP talent selected.

**`unit.hasTalent(talent) : true | false`**

> Note: Accepts talent name (non-case-sensitive string) or SpellID.

> Note: This _only_ works with members of your [`group`](/object-lists.md?id=group), including the `player` object.

```lua
print(healer.hasTalent("Ascendance")) -- checking if your friendly healer is spec'd into ascendance.
-- res: true

print(player.hasTalent("ring of frost")) -- is the player spec'd into ring of frost?
-- res: true

for _, member in ipairs(awful.group) do
    if member.class == "Shaman" and member.hasTalent(204336) then
        print("wow, our shaman has grounding totem!")
    end
end
```

# Buffs & Debuffs

#### **Note:**

> All buff/debuff functions accept SpellID **or** Spell Names, and _optionally_ any "[Awful Object](/what-are-units.md)" as the second arg, which will only return a value if your given object was the caster of the buff/debuff. Spell name queries are _non-case-sensitive_. `target.buff('combustion')` works fine. SpellID is generally the only assuredly accurate method though, as there are several buffs & debuffs in game with the same name.

> Be sure to check out what's available under the [Buffs & Debuffs](/object-attributes.md?id=buffs-amp-debuffs) section in _attributes_ before beginning your implementation.

## buff

Provides information about a specific buff on the object.

**`unit.buff(spell[,sourceObject]) : "buff", ... | nil`**

> Returns: Identical to [UnitBuff](https://wowwiki-archive.fandom.com/wiki/API_UnitBuff) - [1] string `name`, ... | `nil`

```lua
if enemy.buff("combustion") then
    print("Wowie, I'm gonna die!")
    iceBlock:Cast()
end
```

## buffRemains

The time remaining of a specific buff on the object.

**`unit.buffRemains(spell[,sourceObject]) : remains | 0`**

```lua
if ourHealer.buffRemains("avenger's wrath") > 10 then
    print("I feel very safe.")
end
```

## buffStacks

Number of stacks the object has of the given buff.

**`unit.buffStacks(spell[,sourceObject]) : stacks | 0`**

```lua
if player.buffStacks("Well Fed") > 1 then
    print("It's probably time to start counting our calories.")
end
```

## buffUptime

The amount of time that the given buff has been active on the object.

**`unit.buffUptime(spell[,sourceObject]) : uptime | 0`**

```lua
if hunterPet.buffUptime("frenzy") > 10 then
    print("That hunter has been keeping up his frenzy stacks for a while!")
end
```

## buffFrom

Query the object for a list of any active buffs matching the Spell IDs / Spell Names within the given array.

**`unit.buffFrom(spellList[,sourceObject]) : { buff, buff, ... } | nil`**

> Similar: [buffsFrom](object-functions#buffFrom) - Same as buffFrom, except it returns the **number** of buffs from the list that are active

```lua
if friend.buffFrom({980, 172, 1822}) then
    print("My friend is dotted! Oh no!")
end
```

## debuff

Provides information about a specific debuff on the object.

**`unit.debuff(spell[,sourceObject]) : "debuff", ... | nil`**

> Returns: Identical to [UnitDebuff](https://wowwiki-archive.fandom.com/wiki/API_UnitDebuff) - [1] string `name`, ... | `nil`

```lua
if ourHealer.debuff("freezing trap") then
    print("My mans is trapped")
end
```

## debuffRemains

The time remaining of a specific debuff on the object.

**`unit.debuffRemains(spell[,sourceObject]) : remains | 0`**

```lua
if target.debuffRemains("Kidney Shot") > 4 then
    print("time for a double wide surprise.")
end
```

## debuffStacks

Number of stacks the object has of the given debuff.

**`unit.debuffStacks(spell[,sourceObject]) : stacks | 0`**

```lua
if friend.debuffStacks(980) > 3
and decurse:Cast(friend) then
    return awful.alert("Decursed them stacks!", 475)
end
```

## debuffUptime

The amount of time that the given debuff has been active on the object.

**`unit.debuffUptime(spell[,sourceObject]) : uptime | 0`**

```lua
if player.debuffUptime("Agony") > 25 then
    decurse:Cast(player)
    print("Agony's been up for way too long, yo!")
end
```

## debuffFrom

Query the object for a list of any active buffs matching the Spell IDs / Spell Names within the given array.

**`unit.debuffFrom(spellList[,sourceObject]) : { debuff, debuff, ... } | nil`**

> Similar: [debuffsFrom](object-functions#debuffFrom) - Same as debuffFrom, except it returns the **number** of debuffs from the list that are active

```lua
local badStuff = {"Storm Bolt", 408, "Cheap Shot"}
if player.debuffFrom(badStuff) then
    if iceBlock:Cast() then
        return awful.alert("I've had enough of that.", 45438)
    end
end
```

# Spells / Casting

## cooldown

> Estimates the **cooldown of any Unit's spell** based on **combat log event tracking** happening in the background by the framework.

**`unit.cooldown(spellID | spellName) : cooldown | 0`**

```lua
-- most performant with spellIDs
if enemy.cooldown(22812) > 6 then
    if kidney:Cast(enemy) then
        awful.alert("Kidney Shot (No Skin)", kidney.id)
    end
end

-- works with spell names tho, non-case-sensitive
if enemy.cooldown("avenging wrath") > 30 then
    print("we're probably safe yo")
end
```

## used

> Checks if the Unit has cast the given spell in the past **x** seconds, based on **combat log event tracking** happening in the background by the framework.

**`unit.used(spellID | spellName[,durationSeconds]) : true | nil`**

```lua
-- most performant with spellIDs
if player.used(22812, 15) then
    print("we used barkskin in the last 15 sec")
end

-- works with spell names tho, non-case-sensitive
if enemy.used("avatar", 5) then
    print("They used avatar recently yo")
end
```

# Movement & Position

## distanceTo

Distance between the object and another object, accounting for combat reach and bounding radius.

**`unit.distanceTo(otherObject) : distance | 9999`**

> Sister Attribute: [distance](/object-attributes.md?id=distance) - checks distance from the player to the object

> Similar: [distanceToLiteral](object-functions#distanceTo) - same as distanceTo but ignores **combatReach**

```lua
if target.distanceTo(enemyHealer) > 40 then
    print("He's out of range of heals!")
    stormBolt:Cast(target)
end
```

## facing

Checks if the object is facing another object _[at a 180 degree angle by default - the required facing angle to cast spells]_. You can check a specific angle (in degrees) by passing it as the 2nd arg.

**`unit.facing(otherUnit[,angle]) : isFacing | false`**

> Sister Attribute: [`playerFacing[,Angle]`](/object-attributes.md?id=playerFacing-angle) - checks if the player is facing the object. e.g, `target.playerFacing` or `target.playerFacing45`

```lua
if player.facing(target) then
    print("I'm facing my target, so can cast normal spells that require facing!")
end

if player.facing(target, 45) then
    print("I'm facing my target at a <45 degree angle!")
end

-- shockwave example
local bin = awful.bin
local angle = 45 + bin(30, player.hasTalent("big shockwave")) -- 75 degree angle with big shockwave!
local caught = 0
for _, enemy in ipairs(awful.enemies) do
    caught = caught + bin(enemy.distance < 8 and player.facing(enemy, shockwaveAngle))
end
if caught >= 3 then
    shockwave:Cast()
end
```

## facingPosition

Same as **facing**, but you pass it an **x, y, z position**.

```lua
local x,y,z = example.position()
if enemy.facingPosition(x,y,z,45) then
    print("nice!")
end
```

> From the example above: `awful.bin`

## losOf

Checks if the object and another object are in line of sight of each other.

**`unit.losOf(otherUnit) : isLoS | false`**

> Sister Attribute: [los](/object-attributes.md?id=los) - checks between _player_ & object

```lua
if not target.losOf(enemyHealer) then
    print("Target is out of LoS of his healer, kill!")
end
```

## losOfLiteral

Checks if the object is in line of sight of the given object, but ignores line of sight impairing effects like smoke bomb.

**`unit.losOfLiteral(otherUnit) : isLoS | false`**

> Sister Attribute: [losLiteral](/object-attributes.md?id=losLiteral) - checks between _player_ & object

```lua
if target.debuff("Smoke Bomb") then
    print(target.losOfLiteral(player))
end
-- true ... (ignores los-impairing effects!)
```

## position

Current 3D position of the object.

**`unit.position() : x, y, z | nil`**

```lua
local x, y, z = target.position()
print(x, y, z)
-- 2039.393103, 1083.11938, 81.9
```

## predictPosition

The object's estimated position after the given time, based on current velocity & moving direction.

**`unit.predictPosition(timeInSeconds) : x, y, z | curX, curY, curZ | nil`**

```lua
-- cast spell where linear prediction determines the object will be in 0.5s
local x,y,z = unit.predictPosition(0.5)
spell:AoECast(x,y,z)
```

## predictDistance

The object's estimated distance from the given Awful Object [or `player`] after the given time has elapsed. Based on current velocity and moving direction.

**`unit.predictPosition(timeInSeconds[,otherObject]) : dist | 9999`**

> Similar:
>
> **predictDistanceLiteral** - Same thing but ignores combat reach
>
> **predictDistanceToPosition** - Same thing but passed position (**x, y, z, elapsed**)

```lua
print(healer.predictDistance(0.5))
print(healer.distance)
-- 41
-- 38
```

## predictLoS

Estimates whether the object will be in line of sight of the given Awful Object [or `player`] after the given time has elapsed. Based on current velocity and moving direction.

**`unit.predictLoS(timeInSeconds[,otherObject]) : isLoS | false`**

```lua
print(target.predictLoS(0.5, enemyHealer))
print(target.losOf(enemyHealer))
-- false
-- true
-- ^ Random use case: Target is moving out of LoS of their healer, prepare a swap to them.
```

## meleeRangeOf

Checks if the unit is in melee range of another unit.

**`unit.meleeRangeOf(otherUnit) : true | false`**

> Sister Attribute: [`meleeRange`](/object-attributes.md?id=meleeRange) - Checks if the player is in melee range of the unit

```lua
if enemy.meleeRangeOf(healer) then
    print("oh no, he's connected to our healer!")
end
```

## movingToward

Checks if the unit is / has been moving toward another unit, given the angle and duration passed (if any) ...

**`unit.movingToward(otherUnit[,{ angle = degrees, duration = seconds }]) : true | false`**

> Both angle and duration are optional. You may check one or the other, or neither.
>
> Default duration is 0 (Immediately returns true when movement direction meets angle)
>
> Default angle is 30deg (Returns true when object is moving toward at an acute angle)

```lua
if player.movingToward(target) then
    print("Nice!")
end

if enemy.movingToward(player, { angle = 45 }) then
    print("he wants my asshole!")
end

if enemy.movingToward(healer, { angle = 90, duration = 0.5 }) then
    print("he wants my healer's pp real bad!")
end
```

## movingAwayFrom

Checks if the unit is / has been moving away from another unit, given the angle and duration passed (if any) ...

**`unit.movingAwayFrom(otherUnit[,{ angle = degrees, duration = seconds }]) : true | false`**

> Both angle and duration are optional. You may check one or the other, or neither.
>
> Pass angle inverse of movingToward, **more obtuse = more acute to opposing direction**
>
> Default duration is 0 (Immediately returns true when movement direction meets angle)
>
> Default angle is 220deg (Returns true when object is moving away from at a 140deg angle)

```lua
if player.movingAwayFrom(enemy, { angle = 300, duration = 0.25 }) then
    print("it looks like we're really fleeing from this guy")
end

if enemy.movingAwayFrom(player, { angle = 320 }) then
    print("they are running from me lolz")
end

if healer.movingAwayFrom(enemy, { angle = 280, duration = 0.5 }) then
    print("my healer is trying to kite them, maybe I should root them or somethin idk")
end
```

# Actions

## face

Faces the unit or angle as given

**`unit.face() : void`**

**`player.face(unit) : void`**

**`player.face(angle) : void`**

```lua
local exampleAngle = getExampleAngle
player.face(exampleAngle)

if enemy.stupid then
    enemy.face() -- this works
    player.face(enemy) -- this also works
end
```

## setFocus

Sets the unit as focus

**`unit.setFocus() : void`**

## setTarget

Sets the unit as target

**`unit.setTarget() : void`**
