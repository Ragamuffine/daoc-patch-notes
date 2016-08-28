module Vampiir exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ヴァンピール 1.121"],
     text "ヴァンピールはフルリスペックされる。",
     sechib "Vampiric Emrabce (スペック)",
     text "fumble debuff は Shadow Mastery spec に移される。",
     text "NPC dismissal は削除される。",
     text "Vampiir's Blaze はレベル35に移動される。",
     br [] [],
     text "celerity buff は Shadow Mastery から Vampiric Emrabce に移される。",
     ulist ["レベル11, Darkened Swiftness",
            "レベル16, Darkened Quickness",
            "レベル29, Darkened Alacrity",
            "レベル36, Darkened Urgency",
            "レベル45, Darkened Haste"],
     text "自己 Weaponskill バフと自己 Evasion バフのタイマーは共有される。自己 Parry バフとのタイマーは共有されない。",
     sechib "Dementia (スペック)",
     text "skill bonus debuff は削除される。",
     text "effectiveness debuff は削除される。",
     br [] [],
     text "新しい instant cast 召喚ペットがレベル38 Dementia に追加される。このペットはヴァンピールの88%のレベルである。このペットがターゲットを攻撃するとターゲットのパワーを吸収しヴァンピールに転送する。(ターゲットがプレイヤーである場合のみ。)召喚するのに300パワーを使用する。最大5分間持続する。その前にリリースすることができる。再使用タイマーはない。",
     br [] [],
     text "召喚ペットを犠牲にするスキルがレベル42 Dementia に追加される。このスキルを使用するとペットを失うと同時にヴァンピールから root/snare 効果を取り除く。このスキルは攻撃中、移動中でも使用可能で妨害できない。再使用10分。詠唱時間3.5 秒。",
     sechib "Shadow Mastery (スペック)",
     text "fumble debuff は Shadow Mastery レベル11, 21, 32 に移される。",
     text "celerity buff は Vampiric Embrace spec に移される。",
     text "Vampiir's Speed はレベル10 SM に移される。",
     text "Flaring Claw はレベル18 SM に移される。",
     text "Vampiir's Strike はレベル19 SM に移される。",
     text "Renewal はレベル20 SM に移される。",
     text "レベル 32 Endurance Drain, Enervating Embrace は削除される。",
     sechib "Piercing Spec",
     text "新しいスタイル Vampiir's Bite が 45 Pierce に追加される。5 秒背後スタン。"]


patch_1_121C : List (Html Message)
patch_1_121C =
    [h2 [] [text "ヴァンピール 1.121C"],
     text "以下の変化を反映するためにはリスペックが必要になる。",
     br [] [],
     text "effectiveness debuff は Dementia スペックに戻される。",
     ulist ["Level 1 - Hinder Senses - 2% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 1 power - 1 power パルスごとに",
            "Level 9 - Weaken Senses - 9% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 3 power - 1 power パルスごとに",
            "Level 19 - Diminish Senses - 19% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 9 power - 2 power パルスごとに",
            "Level 29 - Abate Senses - 29% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 14 power - 3 power パルスごとに",
            "Level 39 - Banish Senses - 39% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 19 power - 4 power パルスごとに",
            "Level 47 - Devastate Senses - 47% effectiveness debuff - 3s cast - 持続時間7秒 - 3秒ごと詠唱 - 再使用10秒 - 23 power - 5 power パルスごとに"],
     text "スキルデバフは Dementia スペックに戻される。",
     ulist ["Level 14 - Impress Dread - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間10秒 - 6 power",
            "Level 26 - Impress Ambiguity - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間15秒 - 12 power",
            "Level 36 - Impress Confusion - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間20秒 - 18 power",
            "Level 46 - Impress Amnesia - RR/アイテムによるスキル増加を無効化 - 3s cast - 持続時間25秒 - 24 power"],
     text "すべてのスペックの Level 48 claw はパワーコストが 24 から 36 に増加する。",
     br [] [],
     text "Dementia スペックの Summon Night's Servant スペルのパワーコストは 250 から 200 に減少する。ペットのヒットポイントは少し増加する。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121C
