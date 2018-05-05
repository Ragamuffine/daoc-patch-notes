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


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ヘレティック 1.122B"],
     secalb "Enhancements (基本)",
     text "Level 42 - Aura of Deflection - AF の値は 52 から 150 に増加する。"]


patch_1_122C_HotFix : List (Html Message)
patch_1_122C_HotFix =
    [h2 [] [text "ヘレティック 1.122C Hot Fix"],
     text "妨害不可フォーカスダメージDDは立ち上がりを速く、最大ダメージを低く修正される。",
     ulist ["Level 36 - Glistening Blaze - 最初は 85 heat ダメージで 35% ずつ増加し最大 75%。(旧 350%) 初回の詠唱時間は2秒から2.5秒に増加。射程は1500から1600に増加。",
            "Level 42 - Whirling Blaze - 最初は 115 heat ダメージで 45% ずつ増加し最大 115%。(旧 400%) 初回の詠唱時間は2秒から2.5秒に増加。射程は1500から1600に増加。",
            "Level 48 - Torrential Blaze - 最初は 150 heat ダメージで 50% ずつ増加し最大 135% (旧 450%) 初回の詠唱時間は2秒から2.5秒に増加。射程は1500から1600に増加。"]]

    
patch_1_122C_HotFixNotes : List (Html Message)
patch_1_122C_HotFixNotes =
    [h2 [] [text "ヘレティック The Ghost Keep RvR Event and Hot Fix Notes"],
     ulist ["Level 48 - Torrential Blaze - ダメージが増加する。170 ダメージで始まり(以前は150ダメージ) 2 秒ごとに60%増加する。最大170%(以前は135%)。射程は1600のまま。持続時間15秒",
            "Level 42 - Whirling Blaze - 115 ダメージで 2 秒ごとに45%増加、最大110%。射程1600。持続時間15秒"]]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "ヘレティック 1.123"],
     text "ヘレティックはフルリスペックされる。",
     secalb "Crush (スペック)",
     ulist ["Level 30 - Hellfire Tendrils - Concussion 後 - Medium Endurance - Very High Damage - Medium Offensive Penalty - Medium Defensive Bonus - 習得している最も高いレベルの Fiery Grasp が半径200以内にいる敵に最大3体まで適用される。もし Fiery Grasp を習得していない時は何も起こらない。",
            "Level 50 - Shadowfire - Back - Medium Endurance - High Damage - No Hit Bonus - Medium Defensive Bonus - 113 heat damage"],
     text "レベル39スタイル Bonecrusher は半径350以内のすべての敵からランダムでバフを除去する。",
     secalb "Flexible (スペック)",
     ulist ["Level 50 - Leviathan - Back - Medium Endurance - High Damage - Medium Hit Bonus - No Defensive Bonus - 113 heat damage"],
     secalb "Enhancement (スペック)",
     text "グループヘルス&amp;AF強化チャントが新しく追加された。",
     ulist ["Level 5 - Hellflower's Flourish - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを1%増加する。",
            "Level 15 - Hellflower's Bud - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを3%増加する。",
            "Level 25 - Hellflower's Sprout - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを5%増加する。",
            "Level 35 - Hellflower's Effloresce - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを7%増加する。",
            "Level 45 - Hellflower's Bloom - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを10%増加する。"],
     secalb "Rejuvenation (スペック)",
     text "インスタントDoTはインスタントDDに変更される。",
     ulist ["Level 5 - Flickering Embers - Instant cast - 1500 range - 再使用15秒 - 3 power - 19 heat damage",
            "Level 10 - Smoldering Embers - Instant cast - 1500 range - 再使用15秒 - 6 power - 34 heat damage",
            "Level 16 - Heated Embers - Instant cast - 1500 range - 再使用15秒 - 10 power - 48 heat damage",
            "Level 23 - Molten Embers - Instant cast - 1500 range - 再使用15秒 - 13 power - 76 heat damage",
            "Level 30 - Flaming Embers - Instant cast - 1500 range - 再使用15秒 - 19 power - 96 heat damage",
            "Level 38 - Bursting Embers - Instant cast - 1500 range - 再使用15秒 - 25 power - 129 heat damage",
            "Level 48 - Incinerating Embers - Instant cast - 1500 range - 再使用15秒 - 32 power - 160 heat damage"],
     text "インスタントスネア Fiery Stranglehold の射程は500から1000に増加する。"]


patch_1_124D : List (Html Message)
patch_1_124D =
    [h2 [] [text "ヘレティック 1.124D"],
     secalb "Enhancement (スペック)",
     text "単体STRデバフ、単体CONデバフ、単体DEXデバフスペルは以下のように変更になる。",
     text "これらの呪文はインスタント、PBAoEスペル(半径350)になる。",
     text "デバフの効果は変わらない。",
     text "STRとDEXは共通のタイマー15秒を持つ。",
     text "CONは独自のタイマー15秒を持つ"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B
      ++ patch_1_122C_HotFix
      ++ patch_1_122C_HotFixNotes
      ++ patch_1_123
      ++ patch_1_124D
