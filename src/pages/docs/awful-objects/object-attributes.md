---
title: Object Attributes
---

# Introduction

## What's an attribute?

> An attribute is just a **key** within an [awful object](objects.md) that is expected to return some **value**.
>
> All attributes are **non-case-sensitive** and many have **fallback aliases** for added intuitiveness factor.
>
> This means that `object.enemy` will work, but so will `object.Enemy` and `object.isEnemy`

### Attribute Performance

> Reading attributes is **extremely performant**. They act as normal **key-value pairs**, but their value is **generated** upon **reference of the key**, and the **value** is **cached** until the next **"tick"**.

### Multi-returns

> A few attributes have **multiple returns** that are only available by **selection #**, which you can add to the **end of the key**. Example, `player.casting9` **==** `select(9,UnitCastingInfo("player"))`. You can also use **bracket notation** to access them variably `player["casting" .. selection]`. It will be documented where all it is possible to use **multi-return selection** on attributes.

# General Attributes

## exists

**`unit.exists : true | nil`**

```lua
print(target.exists)
-- true
```

## absorbs

number: **`unit.absorbs : absorbs | 0`**

Amount of absorption (shields) remaining on the object

```lua
if execute.damage > target.health + target.absorbs then
    print("they gon die")
end
```

## class

The class of the object, plus all returns of `UnitClass` available by multi-selection #

**`unit.class : "class" | nil`**

**`unit.class2 : "CLASS" | nil`**

> Alternative: `classLiteral` - 2nd return from `UnitClass`. Upper case class name which is always the same across different localizations. Equivalent of `class2`.

```lua
if target.class == "Rogue" then
    print("oh boy, it's a rogue!")
elseif target.class2 == "MAGE" then
    print("wow, it's a mage!")
end
```

## combat

Returns true if the unit is in combat

**`unit.combat : isInCombat | nil`**

```lua
if not enemy.combat then
    sap:Cast(enemy)
end
```

## covenant

The unit's covenant

**`unit.covenant : "Covenant Name" | nil`**

```lua
target.covenant
```

## dead

Returns true if the unit is dead

**`unit.dead : isDead | false`**

```lua
if player.dead then
    awful.alert("rez pls")
end
```

## enemy

Returns true if the unit is an enemy

**`unit.enemy : isEnemy | false`**

```lua
if target.enemy then
    -- do things to your enemy target!
end
```

## friend / friendly

Returns true if the unit is friendly

**`unit.friend : isFriend | false`**

```lua
if target.friendly then
    -- do things to your friendly target!
end
```

## guid

The GUID of the object

**`unit.guid : "UnitGUID" | nil`**

## hp

The health of the object in percentage

**`unit.hp : hpPercentage | 0`**

```lua
print(target.hp)
-- 69
```

> Other HP attributes:
>
> **health** - actual current health of object, as returned from `UnitHealth` (instead of percentage)
>
> **healthMax** - max health of object, as returned from `UnitHealthMax`

## height

The height of the object.

**`unit.height : height | nil`**

```lua
print(target.height)
-- 2.29
```

## id

Returns ObjectID of the object

**`unit.id : ObjectID | false`**

- not for use on players

```lua
if object.id == 123 then
    print("found the object/unit i was lookin for")
end
```

## isHealer

Checks if the object is a healer.

- Bound by limitations of [role](object-attributes#role)

**`unit.healer : isHealer | false`**

```lua
if unit.healer then
    print("wow, it's a healer!")
end
```

## isMelee

Checks if the object is a melee dps.

- Bound by limitations of [role](object-attributes#role)

**`unit.melee : isMelee | false`**

```lua
if unit.melee then
    print("wow, it's a melee!")
end
```

## isPlayer

Checks if the object is a player.

**`unit.player : isPlayer | false`**

```lua
if unit.player then
    print("wow, it's a player!")
end
```

## isRanged

Checks if the object is a player.

- Bound by limitations of [role](object-attributes#role)

**`unit.isRanged : isRanged | false`**

```lua
if unit.ranged then
    print("wow, it's a ranged dps!")
end
```

## isPet

Checks if the object is another player's pet

**`unit.isPet : isPet | false`**

```lua
if unit.pet then
    print("wow, it's a pet!")
end
```

## level

The level of the object via `UnitLevel`

**`unit.level : level`**

```lua
if player.level < 60 then
    print("wow, i am leveling")
end
```

## name

The name of the object

**`unit.name : "name" | nil`**

```lua
print(target.name)
-- Awfulplayer
```

## pointer

> Pointer should be used when passing the object to any non-awful API, as any "normal" function like `UnitHealth` will not work with an awful object.

Uniquely identifying pointer to the object in memory. In the case of Tinkr, returns the associated "WoWGameObject". In the case of Daemonic, returns the unit's GUID.

**`unit.pointer : pointer | nil`**

```lua
print( UnitName(target.pointer) )
-- Awfulplayer, Awfulplayer
```

## race

> The race of the object (in game)

## role

> The role of the object, either `healer`, `melee`, `ranged`, `tank`, or `pet`.

**`unit.role : role | nil`**

```lua
if enemy.role == "healer" then
    kidneyShot:Cast(enemy)
end
```

#### Limitations:

- Built primarily for use **in arena or on party members**. For enemies in BG, World PVP, etc. or for friendly players who are not in your group, it is essentially guessing based on buffs, power resources, etc, and could be wrong sometimes.

## spec

> The unit's specialization as a string, acquired by [inspect](object-attributes#inspect), so it faces the same limitations (group/player only..)

**`unit.spec : "Spec" | "Unknown"`**

```lua
-- print spec when spec changes
awful.addEventCallback(function() print(player.spec) end, "PLAYER_SPECIALIZATION_CHANGED")

if player.spec == "Fire" then
    -- do fire stuff
end
```

## stealth

If the object has an active stealth or invisibility effect, returns the spellID of that effect. Otherwise returns false.

> Does not use a specific stealth list, but instead efficiently parses [`debuffDescriptions`](/object-attributes.md?id=debuffDescriptions) - should work on _all_ current & future stealth/invis effects in the game. If it does not, let us know the specific stealth effect.

**`unit.stealthed : stealthID | false`**

```lua
if enemy.stealth and enemy.distance < 8 then
    if frostNova:Cast() then
        local stealthName = GetSpellInfo(enemy.stealth)
        awful.alert("Nova (".. stealthName ..")", 122)
    end
end
```

## target

The target of the object, returned as an [Awful Object](/what-are-units.md) with all attributes & functions available.

**`unit.target : targetObject | emptyObject`**

```lua
if enemy.target.isUnit(player) then
    barkskin:Cast()
end
```

## visible

Checks if the unit is visible (within render range) using `UnitIsVisible`

**`unit.visible : visible | false`**

# Buffs & Debuffs

> There are also powerful [Buff & Debuff](/object-functions.md?id=buffs-amp-debuffs) related **functions**, rather than **attributes**... Be sure to check those out before beginning your implementation.

## buffCount

Returns number of buffs the unit has

**`unit.buffCount : numBuffs | 0`**

## buffs

Returns an array of all buffs the unit has. Each buff is indexed appropriately, and contains all [UnitBuff](https://wowwiki-archive.fandom.com/wiki/API_UnitBuff) returns.

**`unit.buffs : { { buffName, ... }, { buffName, ... }, ... } | {}`**

```lua
for i, buff in ipairs(player.buffs) do
    local name, rank, icon, count = unpack(buff)
    -- do stuff with cached, performant buffs!
end
```

## debuffCount

Returns number of debuffs the unit has

**`unit.debuffCount : numDebuffs | 0`**

## debuffs

Returns an array of all debuffs the unit has. Each debuff is indexed appropriately, and contains all [UnitDebuff](https://wowwiki-archive.fandom.com/wiki/API_UnitDebuff) returns.

**`unit.debuffs : { { debuffName, ... }, { debuffName, ... }, ... } | {}`**

```lua
for i, debuff in ipairs(player.debuffs) do
    local name, rank, icon, count = unpack(debuff)
    -- do stuff with cached, performant debuffs!
end
```

## buff[index]

Returns an array of all returns provided by [`UnitBuff`](https://wowwiki-archive.fandom.com/wiki/API_UnitBuff) on the object at the given index. You must provide a specific index to this attribute to get the appropriate return.

> Sister Function: [buff](/object-functions.md?id=buff) - Check the unit for a specific buff by spellID or spellName, and get back all the normal `UnitBuff` returns.

**`(unit.buff3 / unit["buff"..index]) : { buffName, ... } | nil`**

```lua
for i=1,#player.buffs do
    -- buffs by index
    local name, _, _, count = unpack(player['buff'..i])
    print(name, count)
end
```

## debuff[index]

Returns an array of all returns provided by [UnitDebuff](https://wowwiki-archive.fandom.com/wiki/API_UnitDebuff) on the object at the given index. You must provide a specific index to this attribute to get the appropriate return.

> Sister Function: [debuff](/object-functions.md?id=debuff) - Check the unit for a specific debuff by spellID or spellName, and get back all the normal `UnitDebuff` returns.

**`(unit.debuff3 / unit["debuff"..index]) : { debuffName, ... } | nil`**

```lua
for i=1,#player.debuffs do
    -- debuffs by index
    local name, _, _, count = unpack(player['debuff'..i])
    print(name, count)
end
```

## buffDescriptions

Returns an array of description text for each buff the unit has. Can parse these descriptions to determine whether or not the unit has an effect of a certain type, or get creative with it! The indexing of the descriptions correspond with their parent buffs, so you can use something like `unit["buff" .. index]` to obtain more info about the buff after finding a match by string.

**`unit.buffDescriptions : { "desc", "desc", ... } | {}`**

```lua
local desc = enemy.buffDescriptions
for i, str in ipairs(desc) do
    local lower = str:lower()
    if lower:match("stealthed") or lower:match("invisible") then
        print("That man is in stealth! Wow!")
        local thisStealth = enemy["buff" .. i]
        print("Stealth Name: " .. thisStealth[1])
        print("Stealth SpellID: " .. thisStealth[10])
    end
end
```

## debuffDescriptions

Returns an array of description text for each debuff the unit has. Can parse these descriptions to determine whether or not the unit has an effect of a certain type, or get creative with it! The indexing of the descriptions correspond with their parent debuffs, so you can use something like `unit["debuff" .. index]` to obtain more info about the debuff after finding a match by string.

**`unit.debuffDescriptions : { "desc", "desc", ... } | {}`**

```lua
local desc = player.debuffDescriptions
for index, str in ipairs(desc) do
    if str:match("Disarmed.") then
        print("We have no arms, wow!")
        local thisDisarm = player["debuff" .. index]
        print("Disarm Name: " .. thisDisarm[1])
        print("Disarm SpellID: " .. thisDisarm[10])
    end
end
```

## cds

Returns true if the object has offensive cooldowns up, false if not.

```lua
if obj.cds and obj.target.isUnit(player) then
    print("uh oh we in troub")
    turtle:Cast()
end
```

## charmed

Checks if the object is charmed (mind control, etc.) using `UnitIsCharmed`

**`unit.charmed : charmed | false`**

## dotted

Returns true if the target has an active damage over time effect, false if not.

> Does not use a specific DoT list, but instead efficiently parses [`debuffDescriptions`](/object-attributes.md?id=debuffDescriptions) - should work on _all_ current & future DoT effects in the game. If it does not, let us know which DoT.

**`unit.dotted : hasDot | false`**

```lua
if not enemy.dotted and not enemy.combat then
    sap:Cast(enemy)
end
```

## purgeCount

Returns the number of purgeable buffs on the unit

**`unit.purgeCount : purgeCount | 0`**

```lua
if enemy.purgeCount > 0 then
    purge:Cast(enemy)
end
```

# Power / PowerTypes

## powerTypes

> First, know your **powerType** aliases (**these are non-case-sensitive**)

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

## power attributes

> Now you can check **power**, **powerMax**, or **powerPct** for any powerType on the unit - just replace **power** with your **powerType alias.**

```lua
unit.power -- default UnitPower return w/ no powerType specified
unit.energy -- energy
unit.energyMax -- max energy
unit.mana -- mana
unit.manaPct -- mana percentage (mana / manaMax) * 100
unit.comboPoints -- combo points
unit.comboPointsMax -- max combo points
unit.cpMax -- also combo points
unit.rage -- current rage
unit.astralPowerMax -- you get it now ;) this works for all powerTypes..

if player.energy < 30 then
    -- pooling energy! blabla!
end

if player.cp >= 5 then
    kidney:Cast()
end
```

# Casts / Channels

## casting

If the object is casting, returns the Casting Info from [`UnitCastingInfo`](https://wowwiki-archive.fandom.com/wiki/API_UnitCastingInfo)

**`unit.casting : "castName" | nil`**

> Returns: string `spellName` | `nil` // Every return of [UnitCastingInfo](https://wowwiki-archive.fandom.com/wiki/API_UnitCastingInfo) can be queried with _selection #_ e.g, `unit.casting9`.

```lua
-- target is casting a polymorph...
print(target.casting)
-- "Polymorph"
print(target.casting9) -- same as target.castID
-- 118
print(target.casting8) -- same as target.castInt
-- nil
```

## castID

The spellID of the spell being cast by the object, if they are casting.

**`unit.castID : castID | nil`**

```lua
if player.castID == 118 and player.castRemains < awful.latency + awful.tickRate + 0.03 then
    blinkTo(player.castTarget)
end
```

## castTarget

If the object is casting, returns the [Awful Object](what-are-units.md) being targeted by that spellcast.

**`unit.castTarget : castTargetObject | nil`**

```lua
if enemy.cast == "Chaos Bolt" and enemy.castTarget.isUnit(player) and enemy.castTimeLeft < awful.buffer then
    blazingBarrier:Cast()
end
```

## castPct

Current percentage of total cast time completed

**`unit.castPct : castPctComplete | 0`**

```lua
-- 70% kick i guess lolz
if target.casting == "Polymorph" and target.castPct > 70 then
    kick:Cast(target)
end
```

## castRemains

The time remaining on the object's cast, minus latency.

**`unit.castRemains : castTimeLeft | 0`**

```lua
local target = awful.target

if target.casting == "Polymorph" and target.castRemains < 0.5 then
    kick:Cast(target)
end
```

## channeling

If the object is channeling, returns the Channeling Info from [`UnitChannelInfo`](https://wowpedia.fandom.com/wiki/API_UnitChannelInfo)

**`unit.channel : "channelName" | nil`**

> Returns: string `spellName` | `nil` // Every return of [UnitChannelInfo](https://wowpedia.fandom.com/wiki/API_UnitChannelInfo) can be queried with _selection #_ e.g, `unit.channel3`.

```lua
-- target is channeling soothing mist...
print(target.channel)
-- "Soothing Mist"
print(target.channel3) -- equivalent of the 3rd return of UnitChannelInfo, 'texture' - The texture path associated with the spell icon.
-- "Interface\\Icons\\Soothing-Mist-Icon.blp" < not accurate, just example
```

## channelID

The spellID of the spell being channeled by the object, if they are channeling.

**`unit.channelID : channelID | nil`**

```lua
if enemy.channel == "Lightning Lasso" then
    para:Cast(enemy)
end
```

## channelRemains

The time remaining on the object's channel, minus latency.

**`unit.channelRemains : channelTimeLeft | 0`**

```lua
if target.channel == "Soothing Mist" and target.channelRemains < 0.5 then
    print("The soothing mist is about to finish!")
end
```

## gcdRemains

Time until the unit's next GCD is available (if any)

- only works on **players** (duh)

**`unit.gcdRemains : gcdRemains | 0`**

```lua
if enemyHealer.gcdRemains > trapTravelTime then
    if trap:AoECast(enemyHealer) then
        awful.alert("haha gotcha on gcd idiot")
    end
end
```

> If you like this one, check out the [cooldown](object-functions#cooldown) function

## lastCast

Latest spellID cast by the object

- only works on **players** (duh)

> Similar: [recentlyCast](object-functions.md#recentlyCast) - Checks if unit has cast X spell in the past Y seconds

**`unit.lastCast : lastCast | nil`**

```lua
if enemy.lastCast == 118 then
    print("they just cast sheep!!!")
end
```

# Movement & Positioning

## distance

Distance between the player and the object, accounting for combat reach and bounding radius.

**`unit.distance : distance | 9999`**

> Sister Attribute: [distanceTo](/object-functions.md?id=distanceTo) - checks distance from the object to another object

> Similar: [`distanceLiteral`](/object-attributes.md?id=distanceLiteral) - checks distance without accounting for combat reach or bounding radius

```lua
if target.distance > 15 then
    charge:Cast(target)
end
```

## combatReach

The combat reach of the object

**`unit.combatReach : combatReach | 0`**

## boundingRadius

The bounding radius of the object

**`unit.boundingRadius : boundingRadius | 0`**

## playerFacing [,angle]

Checks if the player is facing the object _[at a 180 degree angle by default - the required facing angle to cast spells]_, however, you can check a specific angle by adding it to the referenced key.

**`unit.playerFacing : playerIsFacing | false`**

**`unit.playerFacing45 : facing45Degrees | false`**

> Sister Function: [`facing(otherUnit[,angle])`](/object-functions.md?id=facing) - checks if one object is facing _another_ object. e.g, `player.facing(target)` or `target.facing(player, 45)`

> Alternate Aliases: `amIFacing`, `iAmFacing`,

```lua
if target.playerFacing then
    print("I'm facing my target, so can cast normal spells that require facing!")
end

if target.playerFacing45 then
    print("I'm facing my target at a <45 degree angle!")
end

-- Passing a dynamic angle variable using the power of concatenation and bracket notation! Wow!
local shockwaveAngle = 45 + awful.bin(player.hasTalent("Double-Wide Shockwave Surprise")) * 30
local caught = 0
for _, enemy in ipairs(awful.enemies) do
    if enemy.distance < 8 and enemy["playerFacing" .. shockwaveAngle] then
        caught = caught + 1
    end
end
if caught >= 3 then
    shockwave:Cast()
end
```

## los

Checks if the object is in line of sight of the player.

**`unit.los : isLoS | false`**

> Sister Function: [`losOf(otherObject)`](/object-functions.md?id=losOf) - checks this between the object and _another_ object

> Similar: [`losLiteral`](/object-attributes.md?id=losLiteral) - checks LoS without accounting for LoS-impairing effects like smoke bomb.

```lua
if enemy.los then
    print("he can see me!")
end
```

## rotation

Facing direction (rotation) of the object in _radians_.

**`unit.rotation : facingDirection | nil`**

```lua
print(target.rotation)
-- 4.24520301...
```

## meleeRange

Returns true if the player is in melee range of the object.

**`unit.meleeRange : true | false`**

> Sister Function: [`meleeRangeOf(otherObject)`](/object-functions.md?id=meleeRangeOf) - Checks if object is in meleeRange of another object

```lua
if enemy.meleeRange then
    warbreaker:Cast()
end
```

## movementFlags

Movement flags of the object as an **integer**.

**`unit.movementFlags : flags | 0`**

```lua
-- convert integer flags to direction in radians
local flags = band(player.movementFlags, 0xF)
local dir = player.rotation
local mod = 0
if flags == 0x2 then
    mod = pi
elseif flags == 0x4 then
    mod = pi * 0.5
elseif flags == 0x8 then
    mod = pi * 1.5
elseif flags == bor(0x1, 0x4) then
    mod = pi * (1 / 8) * 2
elseif flags == bor(0x1, 0x8) then
    mod = pi * (7 / 8) * 2
elseif flags == bor(0x2, 0x4) then
    mod = pi * (3 / 8) * 2
elseif flags == bor(0x2, 0x8) then
    mod = pi * (5 / 8) * 2
end
return (dir + mod) % (pi * 2)
```

## moving

Checks if the unit is moving : ([speed](object-attributes#speed) > 0)

**`unit.moving : isMoving | false`**

```lua
if player.moving then
    print("hey, stop moving buddy")
end
```

## movingDirection

Moving direction of the object as an angle in **radians**.

**`unit.direction : movingDirection | nil`**

```lua
print(enemy.direction)
-- 3.189384
```

## speed

The current speed of the object (in yards per second), plus all other returns of `GetUnitSpeed` available by selection #, e.g `unit.speed2`

**`unit.speed : currentSpeed | 0`**

**`unit.speed2 : runSpeed | 0`**

```lua
if target.speed < player.speed then
    print("we are moving faster than our target!")
end

if target.speed2 < player.speed2 then
    print("we are able to move faster than our target!")
end
```

# Crowd Control

## bcc

If the object is in breakable crowd control, returns the spellID of that crowd control debuff.

- If there is more than one bCC effect active, the one with the longest remaining duration's ID is returned.

**`unit.bcc : ccDebuffID | nil`**

```lua
if target.bcc then
    print("i'm not gonna attack that, it's in breakable cc")
end
```

## bccRemains

The remaining time of breakable cc effects on the object.

**`unit.bccRemains : remains | 0`**

```lua
-- only cast spell if bcc remains < spell cast time
if target.bccRemains < spell.castTime then
    spell:Cast(target)
end
```

## cc

If the object is in crowd control, returns the spellID of that crowd control debuff.

- If there is more than one CC effect active, the one with the longest remaining duration's ID is returned.

**`unit.cc : ccDebuffID | nil`**

```lua
if healer.cc then
    print("our healer is in cc! help!")
end
```

## ccRemains

The remaining time of crowd control effects on the object.

**`unit.ccRemains : remains | 0`**

```lua
if enemyHealer.ccRemains < awful.buffer + awful.latency and enemyHealer.incapDR >= 0.25 then
    sheep:Cast(enemyHealer)
end
```

## ccInfo

Returns an array containing detailed info about the longest remaining crowd control effect on the object.

**`unit.ccInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

> note: The contents can't be accessed with selection #, it is a single array being returned

```lua
if healer.cc then
    local id, name, remains, drCat, source = unpack(healer.ccInfo)
    print(id, name, remains, drCat, source)
end
-- 118, "Polymorph", 3.839, "Incapacitate", SourceGUID
```

## disarmed

If the object is currently affected by a disarm, returns the spellID of that effect. Otherwise returns false.

> Does not use a specific disarm list, but instead efficiently parses [`debuffDescriptions`](/object-attributes.md?id=debuffDescriptions) - should work on _all_ current & future disarm effects in the game. If it does not, let us know which disarm.

**`unit.disarm : disarmID | false`**

```lua
if player.disarm then
    print("wow, i ain't got no arms!")
end
```

1

## disorient

If the object is disoriented, returns the spellID of the disorient debuff.

**`unit.disorient : disorientID | nil`**

```lua
if player.disorient then
    print("wow, i'm disoriented!")
end
```

## disorientRemains

The remaining time of disorient CC effects on the object.

**`unit.disorientRemains : remains | 0`**

```lua
if player.disorientRemains > 3 then
    print("wow, i'm disoriented for a long time!")
end
```

## disorientInfo

If the object is affected by a disorient crowd control, returns the [ccInfo](/object-attributes.md?id=ccInfo) of the effect.

**`unit.disorientInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

```lua
local id, name, remains, drCat, source = healer.disorientInfo
if name == "Mind Control"
    and remains > gcd
    and purge:Cast(source)
or name == "Psychic Scream"
    and remains > gcd
    and tremor:Cast() then
        print("wow, we really took care of 'em!")
end
```

## incap

If the object is incapacitated, returns the spellID of the incapacitate debuff.

**`unit.incap : incapID | nil`**

```lua
-- player.incap is also valid, this is another alias (obj.incapacitated as well)
if player.incapped then
    print("wow, i'm incapacitated!")
end
```

## incapacitateRemains

The remaining time of incapacitate CC effects on the object.

**`unit.incapRemains : remains | 0`**

```lua
if player.incapRemains > 3 then
    print("wow, i'm incapacitated for a long time!")
end
```

## incapacitateInfo

If the object is affected by an incapacitate crowd control, returns the [ccInfo](/object-attributes.md?id=ccInfo) of the effect.

**`unit.incapacitateInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

```lua
if healer.incap then
    local id, name, remains, drCat, source = unpack(healer.incapacitateInfo)
    print(id, name, remains, drCat, source)
end
-- 118, "Polymorph", 3.839, "Incapacitate", SourceGUID
```

## slowed

If the object is slowed, returns the spellID of the slow debuff.

**`unit.slowed : slowID | nil`**

```lua
if player.slowed then
    print("wowie, i'm real slow!")
end
```

## stunned

If the object is stunned, returns the spellID of the stun debuff.

**`unit.stunned : stunID | nil`**

```lua
if player.stun then
    print("wow, i'm stunned!")
end
```

## stunRemains

The remaining time of stun effects on the object.

**`unit.stunRemains : remains | 0`**

```lua
if player.stunRemains > 3 then
    print("wow, i'm stunned for a long time!")
end
```

## stunInfo

If the object is affected by a stun, returns the [ccInfo](/object-attributes.md?id=ccInfo) of the effect.

**`unit.stunInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

```lua
-- same thing as other cc info :P
```

## rooted

If the object is rooted, returns the spellID of the root debuff.

**`unit.rooted : rootID | nil`**

```lua
if player.rooted then
    print("wow, i'm rooted!")
end
```

## rootRemains

The remaining time of root effects on the object.

**`unit.rootRemains : remains | 0`**

```lua
if player.rootRemains > 3 then
    print("wow, i'm rooted for a long time!")
end
```

## rootInfo

If the object is affected by a root, returns the [ccInfo](/object-attributes.md?id=ccInfo) of the effect.

**`unit.rootInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

```lua
-- same thing as other cc info :P
```

## silenced

If the object is silenced, returns the spellID of the silence debuff.

**`unit.silenced : silenceID | nil`**

```lua
if player.silence then
    print("wow, i'm silenced!")
end
```

## silenceRemains

The remaining time of silence effects on the object.

**`unit.silenceRemains : remains | 0`**

```lua
if player.silenceRemains > 3 then
    print("wow, i'm silenced for a long time!")
end
```

## silenceInfo

If the object is affected by a silence, returns the [ccInfo](/object-attributes.md?id=ccInfo) of the effect.

**`unit.silenceInfo : { debuffID, debuffName, debuffRemains, drCategory, castSource } | {}`**

```lua
-- same thing as other cc info :P
```

# Diminishing Returns

## disorientDR

The disorient DR of the object. `0.25` is quarter DR, `0.5` is half DR, `1` is full DR.

**`unit.ddr : disorientDR | 1`**

```lua
if enemy.disorientDR == 1 then
    fear:Cast(enemy)
end
```

## disorientDRRemains

The time remaining before the disorient DR of the object resets.

**`unit.ddrr : remainingDR | 18`**

```lua
if enemy.ddrRemains >= 16 or enemy.disorientDR == 1 then
    fear:Cast(enemy)
end
```

## incapacitateDR

The incapacitate DR of the object. `0.25` is quarter DR, `0.5` is half DR, `1` is full DR.

**`unit.idr : incapacitateDR | 1`**

```lua
if enemy.incapDR == 1 then
    sheep:Cast(enemy)
end
```

## incapacitateDRRemains

The time remaining before the incapacitate DR of the object resets.

**`unit.idrr : remainingDR | 18`**

```lua
if enemy.idrRemains >= 16 or enemy.idr == 1 then
    sheep:Cast(enemy)
end
```

## stunDR

The stun DR of the object. `0.25` is quarter DR, `0.5` is half DR, `1` is full DR.

**`unit.sdr : incapacitateDR | 1`**

```lua
if enemy.stunDR >= 0.25 and enemy.stunRemains < 0.4 then
    cheapShot:Cast(enemy)
end
```

## stunDRRemains

The time remaining before the stun DR of the object resets.

**`unit.stunDRRemains : remainingDR | 18`**

```lua
if enemy.sdrr >= 16 or enemy.stunDR == 1 then
    cheapShot:Cast(enemy)
end
```

## rootDR

The root DR of the object. `0.25` is quarter DR, `0.5` is half DR, `1` is full DR.

**`unit.rdr : rootDR | 1`**

```lua
if enemy.rootDR >= 0.5 and enemy.rootRemains < 0.4 then
    root:Cast(enemy)
end
```

## rootDRRemains

The time remaining before the root DR of the object resets.

**`unit.rdrr : remainingDR | 18`**

```lua
if enemy.rootDRRemains >= 12 or enemy.rootDR == 1 then
    root:Cast(enemy)
end
```

## silenceDR

The silence DR of the object. `0.25` is quarter DR, `0.5` is half DR, `1` is full DR.

**`unit.silenceDR : rootDR | 1`**

```lua
if enemy.silenceDR == 1 then
    silence:Cast(enemy)
end
```

## silenceDRRemains

The time remaining before the silence DR of the object resets.

**`unit.silenceDRR : remainingDR | 18`**

```lua
if enemy.silenceDRR >= 12 or enemy.silenceDR == 1 then
    silence:Cast(enemy)
end
```

# Immunities & Defensives

## About immunities...

### For the most common applications, you don't need to use these...

> [Spell Objects](spell-objects.md) handle **literally all immunity checking** you would otherwise need to do when **attempting to cast a spell**, you just have to set your **options** when initializing the spell object (or when casting). Definitely read more on the available [spell object options](spell-object-options.md) before making too much use of the following immunity attributes.

> Immunity to **effects** means things like **damage over time debuffs**, **crowd control debuffs**, etc. Immunity to **damage** is as it sounds, **immunity to damage**. Most immunities are to **both effects and damage**, but we offer separate attributes for them because it's better to be **precise**.

## beast

Checks if the unit is currently immune to polymorph effects.

> Does not use a specific buff list, but instead efficiently parses [`debuffDescriptions`](/object-attributes.md?id=debuffDescriptions) - should work on _all_ current & future polymorph immunity effects in the game. If it does not, let us know which one.

> Alternatively: `immuneSheep`, `sheepImmune`

**`unit.beast : true | false`**

```lua
if target.beast then
    print("damn bruh, i can't sheep the man")
end
```

## ccImmunityRemains

Remaining duration of CC immunity effects on the unit

**`unit.ccImmunityRemains : remains | 0`**

- specifically checks for pvp-related buffs/debuffs that make the unit immune to cc (holy ward, bladestorm, fleshcraft, etc.)

```lua
if target.ccImmunityRemains > spell.castTime then
    print("sry mate can't cc ya")
else
    spell:Cast(target)
    print("noice")
end
```

## healingImmunityRemains

Remaining duration of healing immunity effects on the unit

**`unit.healingImmunityRemains : remains | 0`**

- specifically checks for pvp-related buffs/debuffs that make the unit immune to healing (cyclone, etc.)

```lua
if target.healingImmunityRemains > spell.castTime then
    print("sry mate can't heal ya")
else
    spell:Cast(target)
    print("noice")
end
```

## immuneCC

Checks if the unit is currently immune to crowd control effects

**`unit.immuneCC : true | false`**

```lua
if target.immuneCC then
    print("shieeee dawg, I can't cc them!")
end
```

## immuneHealing

Checks if the unit is currently immune to healing effects

**`unit.immuneHealing : true | false`**

- specifically checks for pvp-related buffs/debuffs that make the unit immune to healing (cyclone, etc.)

```lua
if target.immuneHealing then
    print("sry mate can't heal ya")
end
```

## immuneMagic

Checks if the unit is currently **immune to magic damage or effects**

**`unit.immuneMagic : true | false`**

```lua
if target.immuneMagic then
    print("I cannot do anything magic to this man")
end
```

## immuneMagicDamage

Checks if the unit is currently **immune to magic damage**

**`unit.immuneMagicDamage : true | false`**

```lua
if target.immuneMagicDamage and not target.immuneMagicEffects then
    print("I cannot do magic damage to the man, but I can sheep him")
end
```

## immuneMagicEffects

Checks if the unit is currently **immune to magic effects**

**`unit.immuneMagicEffects : true | false`**

## magicDamageImmunityRemains

Remaining duration of **magic damage immunities**

**`unit.magicDamageImmunityRemains : remains | 0`**

## magicEffectImmunityRemains

Remaining duration of **magic effect immunities**

**`unit.magicEffectImmunityRemains : remains | 0`**

## immunePhysical

Checks if the unit is currently **immune to physical damage or effects**

**`unit.immunePhysical : true | false`**

```lua
if target.immunePhysical then
    print("I cannot do anything physical to this man :eggplant:")
end
```

## immunePhysicalDamage

Checks if the unit is currently **immune to physical damage**

**`unit.immunePhysicalDamage : true | false`**

```lua
if target.immunePhysicalDamage and not target.immunePhysicalEffects then
    print("I cannot do physical damage to the man, but I storm bolt him")
end
```

## immunePhysicalEffects

Checks if the unit is currently **immune to physical effects**

**`unit.immunePhysicalEffects : true | false`**

## physicalDamageImmunityRemains

Remaining duration of **physical damage immunities**

**`unit.physicalDamageImmunityRemains : remains | 0`**

## physicalEffectImmunityRemains

Remaining duration of **physical effect immunities**

**`unit.physicalEffectImmunityRemains : remains | 0`**

## immuneSlows

Checks if the unit is currently immune to **slows / snares**

**`unit.immuneSlows : true | false`**

## immuneStuns

Checks if the unit is currently immune to **stuns**

**`unit.immuneStuns : true | false`**

# Misc. Attributes

## inspect

Returns detailed information gathered from inspecting a unit.

> Can only be used on players who are in your party and visible

```lua
-- return value from player.inspect
{
 class_id = 11,
 glyphs = {
 },
 guid = "Player-11-0D13D216",
 class = "DRUID",
 spec_description = "bla bla",
 spec_icon = 132115,
 race = "Tauren",
 spec_background = "DAMAGER",
 class_localized = "Druid",
 lku = "player",
 global_spec_id = 103,
 pvp_talents = {
  3751 = {
   spell_id = 202626,
   name_localized = "Leader of the Pack",
   icon = 135881,
   talent_id = 3751,
  },
  ...etc
 },
 spec_index = 2,
 gender = 3,
 spec_role = "DAMAGER",
 spec_group = 1,
 name = "Awfulcat",
 talents = {
  18571 = {
   name_localized = "Wild Charge",
   talent_id = 18571,
   spell_id = 102401,
   column = 3,
   icon = 538771,
   tier = 2,
  },
  21778 = {
   name_localized = "Mighty Bash",
   talent_id = 21778,
   spell_id = 5211,
   column = 1,
   icon = 132114,
   tier = 4,
  },
  ...etc
 },
 race_localized = "Tauren",
 spec_role_detailed = "melee",
 spec_name_localized = "Feral",
}
```

## mgr

Remaining healing absorption effect of Mindgames

> **mindGamesRemains** works too

**`unit.mgr : mgr | 0`**

## ttd

Remaining time to die of the unit, based on **linear regression algorithm lifted from HeroLib**

> Must set `awful.ttd_enabled` to `true` for ttd functions / attributes to work.

```lua
if target.ttd < 20 then
    -- do pve stuff idk
end
```
