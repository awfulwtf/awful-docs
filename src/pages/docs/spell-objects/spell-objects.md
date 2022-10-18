---
title: Spell Objects
---

# What are they?

> They are another special type of **awful object**, which provide a powerful, customized, object-oriented set of tools **for each spell** your routine will be casting.
>
> You create them by providing a spell ID and traits (options) that apply to your spell. Then for the life of the spell object, all methods, attributes, etc. will act according to these traits.

## Making them

### awful.NewSpell

```lua
awful.NewSpell(spellID, traits) -> Spell Object
```

### Example

```lua
local mortalStrike = awful.NewSpell(12294, {damage = "physical"})
```

Now `mortalStrike` contains all attributes, methods, and functions of a **spell object**. We can use it to gather all kinds of information about Mortal Strike, as well as actually cast it and set up various conditions for casting it. Most relevant information about the spell is gathered from WoW's API by the spell object, and presented in the form of **attributes**. We also told it that it's a physical damage ability - so it will make no mistake about which immunities to avoid attacking into.

## More about them

### Traits

> There's a big ol' ever-growing list of spell object **traits** which tell the framework more about the spell behind the object, and how to use it. Many traits sole purpose is to avoid casting into immunities, and many define different rules for when it's possible to cast the spell.
>
> By default, `:Cast` won't even try to cast while you're in CC, but some abilities can be cast while in CC, like Divine Shield or Ice Block. So you pass `ignoreControl = true` to the options, and bam - it will cast it while in CC.
>
> ```lua
> -- may as well have it cancel channels too, if we're trying to cast it
> iceBlock = awful.NewSpell(123, {ignoreControl = true, ignoreChanneling = true})
> ```
>
> Same for moving and casting, while it does understand you can cast with things like Spiritwalker's Grace or Ice Floes - some spells can always be cast while moving, like scorch or steady shot.
>
> ```lua
> scorch = awful.NewSpell(123, {ignoreMoving = true})
> ```

### Benefits of Spell Objects

> Many complex calculations and actions are handled effortlessly by **Spell Objects**. Mortal Strike is a super basic example, but the `:Cast` method of `mortalStrike` will already make sure the spell is off cooldown, we have enough rage, we're in melee range of the target and facing them, they aren't immune to physical damage (even from something like evasion or die by the sword while the target is facing us,) and more before casting it.
>
> Spell objects allow you to modularize code related to the spell into neat little packages within itself. It makes for a fantastic organization method (code related to each spell is within its own spell object - your actor becomes an easy to digest spell-related stack of priorities, as routines should be!), and a major performance benefit (code related to spells only runs when the underlying spell is ready to be cast)!
>
> Spells with cast times already know to start `:Cast` perfectly timed as an immunity to it will fall, complex AoE positioning around corners and out of range is all handled automatically by `CastEdge`, and soooo much more.

## Populating the Actor

> You can use **[awful.Populate](toolbox-general?id=Populate)** to make a list of spell objects available to your routine actor and the scope of your SpellBook file.
>
> ```lua
> local actor = project.hunter.survival
> local spells = {
>   exhilaration = awful.NewSpell(1234, {heal = true}),
>   intimidation = awful.NewSpell(12345, {effect = "physical", stun = true}),
>   trap = project.hunter.trap, -- grabbing this from hunter file!
> }
> -- populate actor and scope of this file
> awful.Populate(spells, actor, getfenv(1))
> ```
>
> It's important to use Populate if you want to access your spell objects without creating additional local references to them or storing and grabbing them from tables.
>
> [Read more about populate here](toolbox-general?id=Populate)

## Raw Spell List Example

```lua
local NS = awful.NewSpell
awful.Populate({

  -- static objects [not req. but tiny perf. increase and takes care of declaration where i use them]
  target = awful.target,
  focus = awful.focus,
  player = awful.player,
  healer = awful.healer,
  pet = awful.pet,
  enemyHealer = awful.enemyHealer,

  -- dmg
  kill = NS(53351, { damage = "physical", ranged = true, targeted = true }),
  barbed = NS(217200, { damage = "physical", ranged = true, targeted = true }),
  cobra = NS(193455, { damage = "physical", ranged = true, targeted = true }),
  flayed = NS(324149, { damage = "physical", ranged = true, targeted = true, bleed = true }),
  killCommand = NS(34026, { damage = "physical", targeted = true }),
  conc = NS(5116, { effect = "physical", ranged = true, targeted = true, slow = true }),

  -- cc
  trap = hunter.trap,
  tar = NS(187698, { effect = "magic", slow = true }),
  cs = NS(147362, { effect = "physical" }),

  -- offensive
  wrath = NS(19574),
  wild = NS(193530),
  tranq = NS(19801),
  bassy = NS(205691, { damage = "physical", targeted = true }),

  -- defensive
  feign = hunter.feign,
  freedom = NS(53271, { ignoreFacing = true, ignoreLoS = true, beneficial = true }),
  turtle = NS(186265),

  -- misc
  flare = NS(1543),
  mendPet = NS(136, { heal = true }),
  camo = hunter.camo,
  ros = hunter.ros,
  disengage = hunter.disengage,
  racials = {
    -- blood fury
    Orc = NS(20572),
    -- berserking
    Troll = NS(26297),
  },

}, bm, getfenv(1))
```

### [Spell Object Traits](spell-object-traits)
