---
title: Spell Object Attributes
---

# What are they?

> They function the same as [awful object attributes](object-attributes), so it's worth reading up on those if you haven't.
>
> Spell Objects have many attributes of their own though, usually relating to some **information about the spell**, most of which is derived from the **Spell ID** using WoW API, which is why you must provide it instead of a spell name. Here are some examples of spell attributes:
>
> **spell.cd** - Current cooldown of the spell
>
> **spell.name** - Name of the spell
>
> **spell.range** - Max range of the spell
>
> Simple and effective :)

```lua
-- creating new spell object
local mortalStrike = awful.NewSpell(1234, { damage = "physical" })

-- can use methods on it, like :Callback
mortalStrike:Callback(function(spell)
  return spell:Cast(target)
end)

-- casting methods outside of :Callback are also valid ofc
mortalStrike:Cast(target)
heroicLeap:SmartAoE(target)

-- all of the attributes are stored right inside the same object
if mortalStrike.cd < 2 then
  print(mortalStrike.name .. " coming off cd!")
end
```

# Spell Attributes

## baseCD

> The base cooldown of the spell, according to `GetSpellBaseCooldown`, but with fixes applies for spells that have multiple charges

```lua
if target.cooldown("survival instincts") > spell.baseCD then
  spell:Cast(target)
end
```

## castTime

> The cast time of the spell (0 for instant cast spells)

```lua
-- this calculation is already handled inside `:Cast`!
if target.magicImmunityRemains < spell.castTime then
  spell:Cast(target)
end
```

## cd

> Current cooldown of the spell

- `cooldown` is another valid key for the same attribute

```lua
if spell.cd > 10 then
  print("dang it, gonna be a while before i can use this one")
end
```

## charges

> Number of charges available for the spell.

- Round integer, does not include fractional charges.

```lua
if spell.charges >= 2 then
  spell:Cast(target)
end
```

## chargesFrac

> Number of charges available for the spell, including fractional charges.

- Float, includes frac charges.
- `frac` is another valid key for the same attribute

```lua
if fireBlast.frac >= 1.5 then
  fireBlast:Cast()
end
```

## chargesMax

> Number of maximum charges for the spell

```lua
if spell.frac >= spell.chargesMax - 0.5 then
  spell:Cast()
end
```

## nextChargeCD

> Remaining cooldown on the next charge coming back

```lua
if fireBlast.nextChargeCD <= gcd then
  -- blablablabla
end
```

## cost

> The resource cost(s) of the spell, returned as a meta object including all resource costs.

- You can check costs by [powerType](toolbox-general?id=powertypes) `spell.cost[powerType]`
  - though actual stored keys are identical to `GetSpellPowerCost` returns
- Values are stored as numbers
- If the indexed powertype is unknown, it will return 0.

```lua
if spell.cost.energy < 25 then
  spell:Cast()
end

-- combo points
if spell.cost.cp > 3 then
  -- blbllalb
end

if spell.cost.astralPower > 50 then
  --bla
end
```

## damage / effect

> Attempts to scrape damage / healing effect of the spell from its tooltip

- `damage` and `effect` are different keys for the same attribute.
- For combo-point spending abilities, grabs the 1 combo point damage, and multiplies that by current combo points.
- For other spells, it essentially just grabs the biggest number in the tooltip and returns that.
- **Does not account for versatility, armor, defensive buffs, etc** - although buffs that alter damage or stats do seem to affect tooltip damage values.. it's very tough to accurately estimate damage of a spell, but can be done.

```lua
-- executie
if target.health < spell.damage then
  if spell:Cast(target) then
    awful.alert("EXECUTE!!!!", spell.id)
  end
end

-- healing stuff??
if spell.effect < friend.missingHealth then
  spell:Cast(friend)
end
```

## flying

> Checks missiles OM and combat log event history to determine whether or not a spell is still in the air.

- Currently experimental, big changes to come soon.

```lua
if not pyroblast.flying then
  fireBlast:Cast()
end
```

## gcd

> The global cooldown duration the spell will incur, if any

- Most GCD incurring spells incur a base GCD of 1.5s, but some are different. For example:
  - **Mighty Bash**: 1500ms Base GCD / Haste Modifier
  - **Rake**: 1000ms Base GCD / Haste Modifier

```lua
if moreImportantSpell.cooldown > lessImportantSpell.gcd then
  lessImportantSpell:Cast()
end
```

## id

> The SpellID of the spell. You provided it we're just giving it back.

## known

> Whether or not we know the spell, which can be surprisingly annoying to find out.

- `known` is an exhaustive method, requiring one of the following to have a positive return:
  - `IsSpellKnown`
  - `IsPlayerSpell`
  - `GetSpellInfo(spell.name)` - must return the spell name

```lua
if not spell.known then
  print("we know not what we think we not know, we know only the now know that we know")
end
```

## name

> The proper name of the spell

```lua
awful.alert(spell.name, spell.id)
```

## queued

> Whether or not the spell is current & queued for next GCD

```lua
if spell.queued then
  print("It's really happening!")
end
```

## range

> The max range the spell can be cast at

```lua
if target.dist < spell.range then
  awful.alert('hallelujah', spell.id)
end
```

## usable

> Whether or not the spell is currently "usable"

- Based on `IsUsableSpell` api

```lua
if spell.usable then
  spell:Cast()
end
```

## used

> Checks if the spell has been recently used by the player

- these last couple are functions btw, just too lazy to make a whole section til more spell object functions exist

```lua
if spell.used(5) then
  print("we have cast the spell in the last 5 seconds, wow!")
end
```

## inRange

> Whether or not the spell is in range of a unit

```lua
if spell.inRange(unit) then
  print("spel in range of unit, nioce")
end
```
