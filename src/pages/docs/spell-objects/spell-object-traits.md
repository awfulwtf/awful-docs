---
title: Spell Object Traits
---

# Setting Traits

Traits, the 2nd parameter of `awful.NewSpell` allows you to set a list of traits about the spell which affect how it is used.. It expects an associative array in which you can set multiple traits, just make sure they correctly apply to your spell.

```lua
-- @param {number} spellID, spell ID of the spell to create the object for
-- @param {associative array} traits, list of traits for the spell object
awful.NewSpell(spellID, traits)
```

## Some examples:

```lua
-- magic targeted spell, knows not to use into grounding or spell reflect among other magic immunities
awful.NewSpell(1234, { damage = "magic", targeted = true })

-- physical slow spell, windwalker monk "Disable" for example.. knows it can use it as long as they're not immune to physical or slow effects.. for example - physical damage can't be used into Nether Walk, but a physical effect can, so they can be disabled - but if they get freedom or blessing of protection, nope.
awful.NewSpell(123, { effect = "physical", slow = true })

-- magic effect, like "Spellsteal" - again can be used into something like netherwalk, but it's bad to send pyroblasts into it! that's the diff between effect and damage.
awful.NewSpell(13131, { effect = "magic", targeted = true })
```

# List of Traits

## diameter / radius

> **For AoE Spells** - The diameter **or** radius of the AoE reticle

- Only one needs to be defined, do whichever you prefer.
- Accepts a **number** or a **function**, in case the circumference changes based on talents or something, and may need to be updated dynamically.
- Used by [**SmartAoE**](spell-object-methods?id=smartaoe) to know its boundaries when edging or beyond-max-ranging the AoE cast.

```lua
-- 8yd diameter = 4yd radius
{ diameter = 8 }

-- 10yd radius = 20yd diameter
{ radius = 10 }

-- dynamic circumference, we expect some buff / talent will affect it
local bin = awful.bin
{
  diameter = function()
    local base, diameter = 8, 8
    -- + 25% for "increased area" buff
    diameter = diameter + bin(player.buff(23549)) * (base * 0.25)
    -- + 20% for "fake example" talent
    diameter = diameter + bin(player.hasTalent("fake example")) * (base * 0.2)
    return diameter
  end
}

```

## beneficial

> Whether or not the spell has a beneficial effect

- Causes `:Cast` to avoid facing requirement .. Most beneficial spells do not require facing.
- `:Cast` will avoid buffs/debuffs that absorb beneficial effects (e.g, Cyclone / Banish)
- This is an alternative from `heal` trait - which also checks for healing immunities specifically

```lua
{ beneficial = true }
```

## damage

> The type of damage the spell does (if any)

- Causes `:Cast` to avoid attacking into immunities against the given damage type.

```lua
-- physical damage
{ damage = "physical" }
-- magic damage
{ damage = "magic" }
```

## heal

> Whether or not the spell is a healing effect

- Causes `:Cast` to avoid facing requirement .. Most healing spells do not require facing.
- `:Cast` will avoid buffs/debuffs that absorb all healing effects (e.g, Cyclone / Banish)

```lua
{ heal = true }
```

## effect

> The effect type of the spell (if any)

- Causes `:Cast` to avoid immunities to the given effect type

```lua
-- physical effect
{ effect = "physical" }
-- magic effect
{ effect = "magic" }
```

## cc

> Whether or not the spell applies a crowd control effect

- **true**: Causes `:Cast` to avoid immunities to general CC effects (e.g, Bladestorm)
- providing specific effect type also avoids immunities to that cc type:
  - **"stun"**: avoids Icebound Fortitude, Ice Form, etc.
  - **"charm", "fear", "sleep"**: avoids Lichborne
  - **"polymorph"**: avoids Lichborne, druid forms, etc.

```lua
-- general cc
{ cc = true }

-- specifying type avoids general cc immunities, AND specific immunities
-- stun
{ cc = "stun" }
-- charm
{ cc = "charm" }
-- poly
{ cc = "polymorph" }
```

## bleed

> The spell applies a bleed effect

- Causes `:Cast` to avoid immunities to bleeds (e.g, empowered kyrian potion)

```lua
{ bleed = true }
```

## targeted

> Whether or not the spell specifically hits one unit

- Default is `true` for most spells - even if you don't set it
- Causes `:Cast` to avoid immunities to targeted damage/effects.
  - e.g, Grounding / Reflection
    - **immune** to **Pyroblast**
    - **NOT immune** to non-targeted damage/effects like **Meteor**
  - e.g, Evasion / Blur
    - **immune** to **Slam** while facing you
    - **NOT immune** to non-targeted effects like **Intimidating Shout**

```lua
-- set it to false for non-targeted spells
{ targeted = false }
-- set it to true, though this is TRUE by default!
{ targeted = true }
```

## ranged

> Whether or not the spell is cast from range

- This is currently only used for ranged physical spells
- Parry does not apply to ranged physical attacks, so declaring this lets `:Cast` know it's okay to cast the spell into effects like Die by the Sword, Riposte, or Turbo Fists while they are facing you

```lua
{ ranged = true }
```

## alwaysFace

> If `:Cast` should always force face the unit to cast, if not already facing

- Not really recommended, since you can add `face = true` to `:Cast` options situationally when needed.

```lua
{ alwaysFace = true }
```

## ignoreFacing

> Ignore facing requirement, this spell does not require facing when casting on a unit.

```lua
{ ignoreFacing = true }
```

## ignoreLoS

> Ignore LoS requirement, this spell does not require LoS when casting on a unit.

```lua
{ ignoreLoS = true }
```

## ignoreControl

> Ignore control requirement, this spell can be cast while I am in CC

```lua
{ ignoreControl = true }
```

## ignoreMoving

> This spell can be cast while moving

```lua
{ ignoreMoving = true }
```

## ignoreCasting

> This spell can be cast while casting other spells

```lua
{ ignoreCasting = true }
```

## ignoreChanneling

> This spell can be cast while channeling other spells

```lua
{ ignoreChanneling = true }
```

## stupidChannel

> This channel is worthless and my other spells can go ahead and interrupt it

```lua
{ stupidChannel = true }
```
