module Cabalist exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)

patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "カバリスト 1.121"],
     text "カバリストはフルリスペックされる。",
     secalb "Body Destruction (スペック)",
     text "Level 45 lifetap, Abduct Lifeforce, のダメージは 174 から 199 に増加する。",
     secalb "Matter Magic (基本)",
     text "新しい matter DDスペルを追加",
     ulist ["Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power",
            "Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power",
            "Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power",
            "Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power",
            "Level 45 - Magma Crush - 2.6s - 184 matter damage - 1500 range - 30 power"],
     secalb "Matter Manipulation (スペック)",
     text "新しい matter damage PBAoE が追加される。",
     ulist ["Level 8 - Minor Earth Tremble - 52 damage - 300 radius - 5 power",
            "Level 18 - Earth Tremble - 111 damage - 300 radius - 9 power",
            "Level 28 - Major Earth Tremble - 176 damage - 300 radius - 16 power",
            "Level 38 - Upheaval - 260 damage - 300 radius - 23 power",
            "Level 48 - Earthquake - 325 damage - 300 radius - 31 power"],
     text "新しい PBAoE のためにいくつかの呪文が修正される。",
     ulist ["Level 2 - Lesser Decrepify - 削除",
            "Level 3 - Decrepify - level 2 へ移動",
            "Level 4 - Reflect Blow - 削除",
            "Level 6 - Reflect Damage - level 4 へ移動",
            "Level 10 - Lesser Contamination - 削除",
            "Level 13 - Contamination - level 10 へ移動",
            "Level 16 - Lesser Devolution - level 14 へ移動",
            "Level 18 - Punctured Spirit - level 17 へ移動",
            "Level 36 - Drill Spirit - level 34 へ移動",
            "Level 46 - Lance Spirit - level 45 へ移動"],
     text "新しい AoE matter DDスペルを追加",
     ulist ["Level 8 - Earth Shatter - 3.0s - 28 matter damage - 1500 range - 350 半径 - 5 power",
            "Level 17 - Earth Break - 3.0s - 72 matter damage - 1500 range - 350 半径 - 12 power",
            "Level 28 - Earth Crush - 3.0s - 95 matter damage - 1500 range - 350 半径 - 16 power",
            "Level 37 - Stone Break - 3.0s - 123 matter damage - 1500 range - 350 半径 - 21 power",
            "Level 47 - Stone Shatter - 3.0s - 158 matter damage - 1500 range - 350 半径 - 28 power"],
     secalb "Essence Manipulation (スペック)",
     text "新しい instant Energy resistance debuff を追加",
     ulist ["Level 22 - Energy Wither - 15% energy debuff - 1500 range - 10 power",
            "Level 34 - Energy Siphon - 30% energy debuff -1500 range - 16 power",
            "Level 46 - Energy Void - 50% energy debuff - 1500 range - 24 power"],
     text "以下のスペルを移動",
     ulist ["Level 22 disease spell を level 20 に移動",
            "Level 34 disease spell を level 30 に移動",
            "Level 46 life transfer spell を level 41 に移動"],
     secalb "Spirit Animation (スペック)",
     text "ペット cure mesmerization cure を level 16 に追加"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "カバリスト 1.121B"],
     text "カバリストはフルリスペックされる。",
     secalb "Spirit Magic (基本)",
     text "ペットを対象としたバフ呪文はすべて削除される。",
     text "ペットのレベルは召喚者のレベルと等しくなる。",
     br [] [],
     text "新しいペットが追加される。",
     ulist ["Level 1 - Amber Simulacrum - 詠唱6秒 - 40% power - このペットは物理攻撃に特化している。ペットの移動速度は増加している。このペットは True Strike を持ち 100% の確率で攻撃しブレードターンを貫通する。無条件のスタイル Magic Hammer は高ダメージで自己 celerity を proc する。このペットは高い確率で double attack を行う。被ダメージはやや減少している",
            "Level 11 - Ruby Simulacrum - 詠唱6秒 - 40% power - DD スペルの詠唱時間は 2.5 秒から 2.2 秒に減少している。このペットは魔法攻撃に特化している。攻撃属性は body で body resist デバフも行う。このペットを妨害することはできない。",
            "Level 21 - Sapphire Simulacrum - 詠唱6秒 - 40% power - このペットはサポート型でありカバリストのグループでの地位を回復する。このペットはグループの体力とスタミナを回復する。グループに health regen のバフをかける。passive にすればヒールし続ける。このペットを妨害することはできない。",
            "Level 31 - Emerald Simulacrum - 詠唱6秒 - 40% power - このペットはハイブリッド攻撃に特化している。無条件スタイル Emerald Kick はターゲットを病気にし 40% のスネアと 35 ポイントの strength の低下を 9 秒間与える。背後スタイル Emerald Sprain は 40% のスネアを 14 秒間与える。",
            "Level 41 - Jade Simulacrum - 詠唱6秒 - 40% power - このペットはタンクである。このペットの攻撃対象は物理ダメージが 30% 低下する。このペットはマスターのHPが低下すると自分のHPを使ってマスターをヒールする。"],
     text "単体ペット demezz 呪文はレベル25に移動された。",
     text "単体ペットヒールのレベルは以下のように変更になる。",
     ulist ["Level 4 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 31回復",
            "Level 14 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 71回復",
            "Level 24 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 146回復",
            "Level 34 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 201回復",
            "Level 44 - Mend Simulacrum - 詠唱3秒 - 2000 range - 4 power - 300回復"],
     secalb "Spirit Magic (スペック)",
     text "新しくペット犠牲スペルが追加される。simulacrum のパワーを吸収している間は新しいペットを召喚できない。",
     ulist ["Level 3 - Simulacrum's Soul - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少する。",
            "Level 13 - Simulacrum's Fortitude - 詠唱5秒 - 持続時間10分 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。",
            "Level 23 - Simulacrum's Resilience - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。",
            "Level 33 - Simulacrum's Superiority - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。マスターを物理攻撃する者は 5秒間 10% の slow 状態になる。",
            "Level 43 - Simulacrum's Brilliance - 詠唱5秒 - 25% Power - simulacrum を犠牲にする代わりに被物理ダメージが 10% 減少し、最大HPとAFが 10% 増加する。root と snare の効果時間が 25% 減少する。マスターを物理攻撃する者は 5秒間 10% の slow 状態になる。すべての魔法ダメージが 15% 増加する。"],
     text "新しくペット回収スペルが追加される。",
     ulist ["Level 1 - Convert Spirit - 詠唱3秒 - 500 range - 0 Power - 10 power 回復",
            "Level 11 - Convert Minion - 詠唱3秒 - 500 range - 0 Power - 25 power 回復",
            "Level 21 - Convert Retainer - 詠唱3秒 - 500 range - 0 Power - 50 power 回復",
            "Level 31 - Convert Servant - 詠唱3秒 - 500 range - 0 Power - 100 power 回復",
            "Level 41 - Convert Simulacrum - 詠唱3秒 - 500 range - 0 Power - 150 power 回復"],
     text "単体 body resistance debuff は以下のように調整される。",
     ulist ["Level 26 - Diminish Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - body resistances 15%",
            "Level 36 - Dissipate Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - body resistances 30%",
            "Level 46 - Banish Immunities - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - body resistances 50%"],
     text "単体 spirit resistance debuff は以下のように調整される。",
     ulist ["Level 27 - Diminish Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - spirit resistances 15%",
            "Level 37 - Dissipate Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - spirit resistances 30%",
            "Level 47 - Banish Will - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - spirit resistances 50%"],
     text "単体 energy resistance debuff は以下のように調整される。",
     ulist ["Level 29 - Diminish Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 13 power - energy resistances 15%",
            "Level 39 - Dissipate Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 18 power - energy resistances 30%",
            "Level 49 - Banish Conductivity - 詠唱2秒 - 1500 range - 持続時間15秒 - 25 power - energy resistances 50%"]]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "カバリスト 1.121B Hot Fix #2"],
     text "すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。"]


patch_1_122B_HotFix3 : List (Html Message)
patch_1_122B_HotFix3 =
    [h2 [] [text "カバリスト 1.121B Hot Fix #3"],
     text "amber simulacrum ペットの物理防御を低下させる。"]


patch_1_122B_HotFix4 : List (Html Message)
patch_1_122B_HotFix4 =
    [h2 [] [text "カバリスト 1.121B Hot Fix #4"],
     text "Amber Simulacrum ペットの移動速度がやや低下する。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix2
      ++ patch_1_122B_HotFix3
      ++ patch_1_122B_HotFix4
