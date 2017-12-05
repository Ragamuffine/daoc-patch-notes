module Patch1_124 exposing (..)

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


patch_1_124 : List (Html Message)
patch_1_124 =
    [h1 [] [text "Patch 1.124 Live Patch Notes"]]
    ++ Hunter.patch_1_124
    ++ Necromancer.patch_1_124
    ++ Ranger.patch_1_124
    ++ Scout.patch_1_124
    ++ Skald.patch_1_124
    ++ Spiritmaster.patch_1_124


patch_1_124B : List (Html Message)
patch_1_124B =
    [h1 [] [text "Patch 1.124B Live Patch Notes"]]
    ++ Bainshee.patch_1_124B
    ++ Berserker.patch_1_124B
    ++ Blademaster.patch_1_124B
    ++ Bonedancer.patch_1_124B
    ++ Cabalist.patch_1_124B
    ++ Enchanter.patch_1_124B
    ++ Mercenary.patch_1_124B
    ++ Necromancer.patch_1_124B
    ++ Savage.patch_1_124B
    ++ Skald.patch_1_124B
    ++ Spiritmaster.patch_1_124B
    ++ Sorcerer.patch_1_124B
    ++ Warlock.patch_1_124B
    ++ Vampiir.patch_1_124B
