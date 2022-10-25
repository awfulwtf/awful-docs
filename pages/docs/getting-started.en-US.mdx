import Callout from 'nextra-theme-docs/callout'
import Link from 'next/link'

<Callout emoji="💡">
  This quick < 20 minute start-up guide should get you from zero to hero and have your own addon successfully performing a rotation.
</Callout>

# **Preparations**

## First, if you haven't... [download awful here](https://awful.wtf/download).

> **I highly recommend you download these AddOns.** They're invaluable tools that will save you a lot of time.

- [idTip](https://www.curseforge.com/wow/addons/idtip) - Displays spellIDs in spell/buff/debuff/item tooltips.

- [BugSack](https://www.curseforge.com/wow/addons/bugsack) - Stores Lua errors & their full debug stack to view later, instead of popping up on your screen in the middle of gaming.

- [BugGrabber](https://www.curseforge.com/wow/addons/bug-grabber) - Required dependency of BugSack.

_If you don't already have a code editor, you'll need one. I recommend [VSCode](https://code.visualstudio.com/)._

## **Setting up your directory**

- 1.) Once `awful` is installed in your unlocker folder, create/enter the `routines` folder [awful/**routines**]. This is where our project lives, and where **awful framework** will load it from.

- 2.) Create a new folder within `routines` and name it whatever you'd like to name your project. Make it something epic. For this example, we're going to keep it nice and boring by calling it `example`.

Anywhere I reference `example` in this guide, just go ahead and replace it with your project's name.

#### Our project directory:

> .../awful/routines/**example**

## **Getting our code to load (bars)**

Now, you can open the folder you made in whichever code editor you prefer. [VSCode](https://code.visualstudio.com/) is a great option if you're unsure.

You'll need to **create a new .lua file**. Go ahead and **create it in your directory**, and **name it after your project**, like this: `example.lua`

> awful/routines/example/**example.lua**

Nice! Now, we're going to write some stuff in there. Replace the `example` variable with your project name, but no spaces or special characters here. You're coding now, and variables don't support that kind of swag. My preferred naming convention is [camelCase](https://techterms.com/definition/camelcase)!

```lua
local Unlocker, awful, example = ...

awful.DevMode = true
```

> With the first line, you just made a few **important namespaces** available to this file, including **your own project's**. You also enabled `awful.DevMode`, which will do a few neat things to make life as a dev easier.

## **Hello world?**

Let's see if we're in. When you set `awful.DevMode` to `true`, the `awful` namespace became accessible globally. You should now be able to use `/dump` to read its contents via in-game chat. Try running the command below in WoW chat:

> /dump awful.hello

- If this printed something real nice to chat, **you're in!** Otherwise, back to step 1..

> If you ever have questions or need help, we have an **amazing** community of skilled, active, and helpful routine developers in our discord: https://discord.gg/JkQEPpED6W

## **Setting up our routine**

Now we're gonna make a **couple more files & directories**, and add a little more code to our **core file**. (for me, that's `example.lua`)

This should only take a couple of minutes, and by the time you're done, you'll have a legit routine casting spells.

- Awful's auto-load will try to interpret common shorthand for class names, like **dh**, **dk**, **lock**, etc. If you use shorthand and hit a roadblock on the next step, try changing any shorthand to the full class name, like `warlock` or `DeathKnight` instead.

### **Create these directories:**

> example/**ClassName**

> example/ClassName/**spells**

### **...and these files**

> example/ClassName/**SpecName.lua**

> example/ClassName/spells/**SpecName.lua**

- _Make sure you replace `ClassName` with your class name, and `SpecName` with your spec name._

## **Initializing the routine**

### How do I tell awful framework I have a routine I want it to run with **/awful toggle**?

1.) Create a **table** in your project's **namespace** named after your **class**. _(Shorthand still supported here!)_

2.) Create a **routine actor** in that **table**, named after our specialization, and tell it the **specialization index** and class we want it to run for.

### What??? How do I put a table in my namespace? Spec index???

> Don't stress the details, **you'll have working code in a sec**. Everything else is explained elsewhere in the docs.

- For this example, I'm making a basic **Arms Warrior** routine on a class trial. If you're feeling confident, I encourage you to try a **different class** or throw in some **extra spells & logic** to challenge yourself!

#### Let's write some code.

### **Core File**: .../example/**example.lua**

- First, we're going to create a **table** for our **class** inside our project's **namespace**. We are doing this in our **core file**, as it will be loaded by awful first. Be sure to replace `example` and `warrior` with your project and class names respectively.

- We will also create our **routine actor** here, before initializing it in the actor file. Since we're playing **Arms**, our **specialization index** is `1`. Be sure to replace `1` in this file with the **correct spec index** and **"warrior"** with the correct class. _(Shorthand is still supported here, y'all!)_

> Your **specialization index** can be acquired from the same **dump command** we used in-game, like this: `/dump GetSpecialization()`, or you can just **count from top spec to bottom spec** in your **talents frame** under the **specialization tab** in-game.

```lua
local Unlocker, awful, example = ...

awful.DevMode = true

example.warrior = {}
example.warrior.arms = awful.Actor:New({ spec = 1, class = "warrior" })
```

### **Actor File**: .../example/ClassName/**SpecName.lua**

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

-- stuff out here only runs once, when the file is first loaded.
print("Example warrior locked and loaded!")

-- this is the routine actor function.
arms:Init(function()
    -- everything in here is running *onUpdate*
    -- it's trying to "act" every frame, by the conditions and statements set within it.
    -- that's why you will be *spammed* with this print when you toggle your routine.
    -- these are comments and you can remove them :)
    print("Wow, it's really running!")
end)
```

> Now try a **/reload**. You should see your little OnLoad class print first. Go ahead and **enable the routine** by typing **/awful toggle** ... You should be spammed with that print you made above! If not, go back and make sure you followed every step **perfectly**. If even one character is wrong, **it will not work**.

## **Cooking up a Spell Book**

#### .../example/ClassName/spells/**SpecName.lua**

- We're calling this file our **spell book** because it will contain a list of our spells as **spell objects**, created with `awful.NewSpell`

Be sure to replace all instances of **"example"** with your project name, **"warrior"** with your class name, and **"arms"** with your spec name. Also, you're gonna need to acquire the **spell IDs** for the spells you want it to use.

> The most **convenient** way to collect **spell IDs** is with the AddOn [idTip](https://www.curseforge.com/wow/addons/idtip), it just adds them to the **tooltip** when **hovering spell icons**.

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

local NewSpell = awful.NewSpell
awful.Populate({
    execute = NewSpell(163201),
    slam = NewSpell(1464),
    mortalStrike = NewSpell(12294),
    overpower = NewSpell(7384),
    warbreaker = NewSpell(262161), -- <-- don't forget the comma here when you add more spells, this is a table!
}, arms, getfenv(1))
-- ^^^ make sure you replace "arms" here with your specialization's routine actor!
```

Here's what we've done in this file so far:

- Created a local reference to our actor, **arms**, and a couple of other things to make the meat of the code look better.

- Populated it, as well as our current environment with some delicious **spell objects**.

Now, we'll initialize some **callbacks** for all of these spells. Prepare for some more code.

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

local NewSpell = awful.NewSpell
awful.Populate({
    execute = NewSpell(163201),
    slam = NewSpell(1464),
    mortalStrike = NewSpell(12294),
    overpower = NewSpell(7384),
    warbreaker = NewSpell(262161),
}, arms, getfenv(1))

execute:Callback(function(spell)
    spell:Cast(target)
end)

overpower:Callback(function(spell)
    spell:Cast(target)
end)

warbreaker:Callback(function(spell)
    spell:Cast(target)
end)

mortalStrike:Callback(function(spell)
    spell:Cast(target)
end)

slam:Callback(function(spell)
    spell:Cast(target)
end)
```

> Nice! Now we have some **usable spell objects**! Now let's pull them into our actor.

## **It's ALIVE!!!**

- Back in the **routine actor** file, let's start by just **calling** all of our **spell objects** in a basic priority arrangement and make it **auto attack** to generate **rage**.

You'll want to [pull up](https://www.youtube.com/watch?v=jjyDfLPKmNk) on a Training Dummy for this.

> Lua is interpreted line by line, **left to right**, then **top to bottom**. Be sure to consciously sort your **actions** based on **highest** to **lowest** priority!

> #### .../example/ClassName/**SpecName.lua**

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

print("Example warrior locked and loaded!")

arms:Init(function()
    -- only do this stuff if our target is an enemy
    if target.enemy then
        -- auto attack to generate rage
        StartAttack()
        -- spells we created in the spell book are magically available in our actor!
        execute()
        overpower()
        warbreaker()
        mortalStrike()
        slam()
    end
end)
```

> Now, hit up that **/reload**, enable it by typing **/awful toggle** in chat, and you might notice... **you have a functioning routine!!!** 🎉

## **Souping it up a bit...**

> Seriously, if you made it this far... **amazing work.**
>
> I'm really excited to see what you come up with in the future!

![clappa](https://i.pinimg.com/originals/01/d9/a4/01d9a44af5aa852624b87f8f280f4942.gif ":size=128")

Before we wrap things up, let's clean this routine up just a bit... We're going to add some _relatively_ advanced logic like it's nothing:

- Make it avoid attacking into physical immunities by **defining the damage type** of our **damaging spells**

- Make it auto charge or heroic leap to the target in a way that feels natural, by **tracking player movement history**

- Make it cast warbreaker and avatar at high priority when `/awful burst` is used

- Add some **fancy alerts** for our gap closers and burst abilities

- Set **labels** to some of our **callbacks** and pass them to our spell objects to run specific callbacks

- Make slam stop eating up all of our rage

- Have it maintain Rend on target

- Use sweeping strikes when there's nothing else to do (lowest priority)

### **The book expands**

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

local NewSpell = awful.NewSpell
awful.Populate({
    execute = NewSpell(163201, { damage = "physical" }),
    slam = NewSpell(1464, { damage = "physical" }),
    mortalStrike = NewSpell(12294, { damage = "physical" }),
    overpower = NewSpell(7384, { damage = "physical" }),
    warbreaker = NewSpell(262161, { damage = "physical", facingNotRequired = true }),
    rend = NewSpell(772, { damage = "physical", bleed = true }),
    sweepingStrikes = NewSpell(260708),
    charge = NewSpell(100),
    leap = NewSpell(6544),
    avatar = NewSpell(107574),
}, arms, getfenv(1))

charge:Callback("gapclose", function(spell)
    -- don't charge if we recently leaped
    if leap.cd > 29 then return end
    if target.distance > 12 and player.movingToward(target, { angle = 45, duration = 0.15 })  then
        if spell:Cast(target) then
            awful.alert("Charge (Gapclose)", spell.id)
        end
    end
end)

leap:Callback("gapclose", function(spell)
    -- don't leap if we recently charged
    if charge.recentlyUsed(2) then return end
    if target.distance > 12 and player.movingToward(target, { angle = 45, duration = 0.15 }) then
        if spell:AoECast(target) then
            awful.alert("Leap (Gapclose)", spell.id)
        end
    end
end)

execute:Callback(function(spell)
    spell:Cast(target)
end)

overpower:Callback(function(spell)
    spell:Cast(target)
end)

-- avatar during burst
avatar:Callback("burst", function(spell)
    if target.meleeRange and spell:Cast() then
        awful.alert("Avatar (Burst)", spell.id)
    end
end)

-- high priority warbreaker on /awful burst
warbreaker:Callback("burst", function(spell)
    if spell:Cast(target) then
        awful.alert("Warbreaker (Burst)", spell.id)
    end
end)

-- non-labelled warbreaker falls lower in prio list
warbreaker:Callback(function(spell)
    spell:Cast(target)
end)

mortalStrike:Callback(function(spell)
    spell:Cast(target)
end)

slam:Callback(function(spell)
    -- only use slam while capping out on rage so we can always MS on cooldown...
    if mortalStrike.cd > 3 or player.rage > 70 then
		spell:Cast(target)
    end
end)

-- maintain rend single target, high priority
rend:Callback("maintain", function(spell)
    if target.debuffRemains(spell.id, player) < 4 then
        spell:Cast(target)
    end
end)

-- spread rend, low priority
-- (rend spreading is probably not great, it's just an example of how we *can* do it)
rend:Callback("spread", function(spell)
    if player.rage > 55 then
        for _, enemy in ipairs(enemies) do
            if not enemy.isUnit(target) and enemy.debuffRemains(772, player) < 4 then
                if spell:Cast(enemy) then
                    awful.alert("Rend " .. enemy.class .. " (Spread)", spell.id)
                    return true
                end
            end
        end
    end
end)

sweepingStrikes:Callback(function(spell)
    if player.combat then
        spell:Cast()
	end
end)
```

- See how we're able to set up **callback functions** for each **spell object** in a way that will allow us to stay organized? We can group our **conditions** and/or **actions** into neat little modular components that we can easily access from the actor via **callback labels**, like **"burst"**, **"maintain"**, or **"spread"** above. This naturally follows best practices for staying organized, and gives us the ability to easily move around the **priority** of what may soon be huge blocks of code.

- When we have another **reason** that a spell should be cast, we can add another **callback** under a different **label** and fit it into our existing priority list.

> _Tip:_ Always do frequent tests with DevMode disabled to keep it ready for production.

### **It does more stuff!**

```lua
local Unlocker, awful, example = ...
local arms = example.warrior.arms

print("Example warrior locked and loaded!")

arms:Init(function()

	-- keep in mind we're only doing *anything* in this if/then statement if there is an enemy target.
	if target.enemy then
		StartAttack()
		-- burst!
		if awful.burst then
			avatar("burst")
			warbreaker("burst")
		end
		charge("gapclose")
		leap("gapclose")
		execute()
		rend("maintain")
		overpower()
		warbreaker()
		mortalStrike()
		-- rend("spread") -- hey, this is commented out, so it won't spread rend!
		slam()
		sweepingStrikes()
	end

end)
```

> **Sheeesh**, this thing really cranks now. Nice!

- I'm sure you'll come up with **much** better than this though. This is just an **ultra-basic** routine whipped up to get you introduced, it doesn't cover the tiniest fraction of what you'll find **awful framework** is capable of. I'll be doing my best to keep things **thoroughly** documented going into the future. So keep an eye out!

**Keep playing around, don't be afraid to try new things. Experiment and have a good time. Most importantly, _always_ show off what you make!**

#### I hope this has been helpful. Send any feedback my way! Alexei#1234 on Discord.

...Now, **click around through the stuff on the left** and explore the **power** of awful framework!!!
