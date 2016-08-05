module Eldritch exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "エルドリッチ 1.121"],
     text "エルドリッチはフルリスペックされる。",
     text "エルドリッチはレルムアビリティーをリスペックされる。",
     text "レルムアビリティーに Ichor of the Deep が追加される。",
     sechib "Mana Magic (スペック)",
     text "Level 2 PBAoE は削除される。",
     text "Level 8 strength/constitution debuff は Level 12 になる。",
     text "Level 32 PBAoE Mana Billow は Level 31 になる。",
     br [] [],
     text "新しい single target root が追加される。",
     ulist ["Level 2 - Soul Grasp - 2.5s cast - 1500 range - 15秒間継続 - 3 power",
            "Level 12 - Soul Clutch - 2.5s cast - 1500 range - 23秒間継続 - 7 power",
            "Level 22 - Soul Hold - 2.5s cast - 1500 range - 44秒間継続 - 17 power",
            "Level 32 - Soul Embrace - 2.5s cast - 1500 range - 57秒間継続 - 23 power",
            "Level 42 - Soul Restraint - 2.5s cast - 1500 range - 69秒間継続 - 29 power"],
     sechib "Light Magic (スペック)",
     text "Level 40 nearsight Abrogate Sight は Level 41 になる。",
     text "Level 22 cold DD Shadowcrash は Level 21 になる。",
     text "Level 46 dexterity/quickness debuff Extinguish Coordination は Level 44 になる。",
     br [] [],
     text "新しく spirit resistance debuff が追加される。",
     ulist ["Level 22 - Crumble Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 10 power - spirit resistance debuff 15%",
            "Level 34 - Fade Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 16 power - spirit resistance debuff 30%",
            "Level 46 - Vanquish Spirit - Instant cast - 5s 再使用 - 1500 range - 15秒間継続 - 24 power - spirit resistance debuff 50%"]]
