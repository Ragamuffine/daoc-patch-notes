module Patch20170202 exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Message exposing (..)
import Style exposing (..)
import Animist
import Armsman
import Bainshee
import Bard
import Berserker
import Blademaster
import Bonedancer
import Cabalist
import Champion
import Cleric
import Druid
import Eldritch
import Enchanter
import Friar
import Healer
import Heretic
import Hero
import Hunter
import Infiltrator
import Mauler
import Mentalist
import Mercenary
import Minstrel
import Necromancer
import Nightshade
import Paladin
import Ranger
import Reaver
import Runemaster
import Savage
import Scout
import Shadowblade
import Shaman
import Skald
import Sorcerer
import Spiritmaster
import Thane
import Theurgist
import Valewalker
import Valkyrie
import Vampiir
import Warden
import Warlock
import Warrior
import Wizard


patch_20170202 : List (Html Message)
patch_20170202 =
    [h1 [] [text "Hot Fix Changes - 2/2/17"]]
    ++ Animist.patch_20170202
    ++ Bainshee.patch_20170202
    ++ Bonedancer.patch_20170202
    ++ Cabalist.patch_20170202
    ++ Enchanter.patch_20170202
    ++ Hunter.patch_20170202
    ++ Mentalist.patch_20170202
    ++ Necromancer.patch_20170202
    ++ Spiritmaster.patch_20170202
