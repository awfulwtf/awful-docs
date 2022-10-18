---
title: Player Attributes
---
# These are attributes & functions only available to the `player` object.

## covenant

Your chosen covenant as a string.

**`player.covenant : "covenant" | nil`**

```lua
local player = awful.player
print(player.covenant)
-- res: "Night Fae"
```

## specialization

Your specialization index (number value)

**`player.specialization : specID`**

```lua
print(player.spec)
-- res: 2
```

## falling

Returns true if the player is in the air.

**`player.falling : falling | false`**

```lua
if player.falling then
    print("we're gonna die!")
end
```

## hasConduit

Checks if the player has conduit by given name or ID

**`player.hasConduit("conduit name" | conduitSpellID) : true | false`**

## hasTalent

Checks if the object is spec'd into the given talent or PvP talent.

**`player.hasTalent(talent) : true | false`**

> Note: Accepts talent name (non-case-sensitive string) or SpellID.

> Note: This also works with members of your [group](/object-lists.md?id=group). Putting it here for more visibility. More about it [here](/object-functions.md?id=hasTalent).

```lua
print(player.hasTalent(113724)) -- ring of frost spellID
-- res: true

print(player.hasTalent("ring of frost")) -- ring of frost string!
-- res: true

print(Player.HasTalent("Ring of Frost")) -- PascalCase & proper case-sensitivity
-- res: true
```

## mainHandEnchant

Checks if the player has enchant on mainhand (hello enhance players)

**`player.mainHandEnchant : true | false`**

> Similar: **mainHandEnchantRemains** : returns remaining duration of mh enchant

## offHandEnchant

Checks if the player has enchant on offhand

**`player.offHandEnchant : true | false`**

> Similar: **offHandEnchantRemains** : returns remaining duration of oh enchant

## mounted

Checks if the player is mounted

**`player.mounted : true | false`**

## timeStandingStill

Returns the amount of time the player has been standing still

**`player.timeStandingStill : tss | 0`**
