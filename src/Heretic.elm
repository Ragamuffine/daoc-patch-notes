module Heretic exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヘレティック 1.121"],
     text "ヘレティックはフルリスペックされる。",
     text "ヘレティックはレルムアビリティーをリスペックされる。",
     text "レルムアビリティーに Ichor of the Deep が追加される。",
     secalb "Rejuvenation (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secalb "Rejuvenation (スペック)",
     text "Reanimate Corpse (monster rez) は次のように変更される。100% hitpoints/power/endurance ではなくて 50% になる。resurrection sickness が除去されるのはそのままである。heal/buff することが可能になる。ターゲットは戦闘および呪文詠唱が可能になる。20 秒間継続の 75% damage reduction を得る。AoE DoT を失う。disease 状態になる。cure disease は可能だが damage reduction を失う。",
     br [] [],
     text "新しい single target matter DD が追加される。",
     ulist ["Level 2 - Dark Ashes - 2.6s cast - 1500 range - 4 power - 13 matter damage",
            "Level 17 - Dark Obsidian - 2.6s cast - 1500 range - 9 power - 67 matter damage",
            "Level 24 - Dark Slag - 2.6s cast - 1500 range - 14 power - 89 matter damage",
            "Level 35 - Dark Basalt - 2.6s cast - 1500 range - 28 power - 146 matter damage",
            "Level 45 - Dark Magma - 2.6s cast - 1500 range - 44 power - 184 matter damage"],
     text "AoE focus snare DD のレンジが 1750 になる。",
     secalb "Enhancement (スペック)",
     text "新しい constitution debuff が追加される。",
     ulist ["Level 4 - Dark Horror - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 constitution",
            "Level 20 - Mind Horror - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 constitution",
            "Level 31 - Evil Horror - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 constitution",
            "Level 42 - Demon Horror - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 constitution"],
     text "新しい strength debuff が追加される。",
     ulist ["Level 3 - Soften Joints - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 strength",
            "Level 13 - Soften Limbs - 3.0s cast - 1500 range - 45秒間継続 - 9 power - 16 strength",
            "Level 22 - Soften Bones - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 strength",
            "Level 34 - Soften Muscle - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 strength",
            "Level 44 - Soften Strength - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 strength"],
     text "新しい dexterity debuff が追加される。",
     ulist ["Level 6 - Heat Wave - 3.0s cast - 1500 range - 45秒間継続 - 5 power - 11 dexterity",
            "Level 16 - Heat Rush - 3.0s cast - 1500 range - 45秒間継続 - 9 power - 16 dexterity",
            "Level 25 - Heal Swell - 3.0s cast - 1500 range - 45秒間継続 - 14 power - 25 dexterity",
            "Level 35 - Heat Coil - 3.0s cast - 1500 range - 45秒間継続 - 18 power - 31 dexterity",
            "Level 45 - Heat Flux - 3.0s cast - 1500 range - 45秒間継続 - 22 power - 41 dexterity"],
     text "新しい single target strength/constitution shear が追加される。",
     ulist ["Level 36 - Endowment Seize - 3.0s cast - 1750 range - 12 power"],
     text "single target damage shield スペルは除去される。",
     text "group target damage shield スペルは除去される。",
     text "group target reactive buff shear proc は除去される。",
     text "レベル 36 self damage add, Infernal Tear, はレベル 37 になる。",
     text "自己 melee-absorb buff はベースからスペックになる。",
     secalb "Crush (スペック)",
     ulist ["Level 39 - Bone Crusher - Concussion-up - ダメージ増加"]]
