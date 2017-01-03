module Friar exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "フライアー 1.121"],
     text "フライアーはフルリスペックされる。",
     secalb "Rejuvenation (基本)",
     text "Cure Poison と Cure Disease のキャスト時間は2.4秒に短縮される。",
     secalb "Rejuvenation (スペック)",
     text "新しい cure mesmerization 能力を追加",
     ulist ["Level 26 - Awaken Soul - 3s cast time - 1500 range - 6% power cost"],
     text "新しい pulsing poison cure を追加",
     ulist ["Level 14 - Pulsing Cure Poison I - 3.5s cast - 2000 range - 20 power",
            "Level 28 - Pulsing Cure Poison II - 3.7s cast - 2000 range - 25 power"],
     text "新しい pulsing disease cure を追加",
     ulist ["Level 18 - Pulsing Cure Disease I - 3.5s cast - 2000 range - 20 power",
            "Level 36 - Pulsing Cure Disease II - 3.7s cast - 2000 range - 28 power"],
     secalb "Enhancements (スペック)",
     text "グループ resistance buff を pulse に変更する。3種類の resistance buff は一つにまとめられる。2000 range, 詠唱時間3.0秒, pulse は 30秒間継続3秒毎。この buff は CL buff およびパラディンの resist buff とスタックしない。",
     ulist ["Level 13 - Golestandt's Fire - Heat/Matter/Cold resist 12%増加",
            "Level 31 - Golestandt's Breath - Heat/Matter/Cold resist 18%増加",
            "Level 46 - Golestandt's Heart - Heat/Matter/Cold resist 24%増加"],
     secalb "Staff (スペック)",
     text "フライアーの基本 Staff ダメージテーブルは他のハイブリッドクラスと同じになる。",
     br [] [],
     text "Staff のスタイルは以下のように修正される。",
     ulist ["Level 4 - Figure Eight - 正面 - 14 damage bleed",
            "Level 15 - Double Strike - Figure Eight - 5秒スタン",
            "Level 21 - Counter Evade - Off evade style - 21%攻撃速度デバフ、ダメージやや増加",
            "Level 25 - Banish - Friar's Friend - PBAOE 175 DD (spirit)",
            "Level 34 - Holy Staff - Anytime - ダメージやや低下",
            "Level 39 - Friar's Fury - Counter Evade - 14秒 hinder",
            "Level 42 - Dancing Staff - Holy Staff - 距離1000以内のグループメンバーの移動速度を15%4秒間増加させる。このボーナスは戦闘中であってもスピードワープの中でも有効。",
            "Level 50 - Exommunicate - Anytime - 150 direct damage (spirit)"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "フライアー 1.121B"],
     text "フライアーはフルリスペックされる。",
     secalb "Enhancements (スペック)",
     text "Enhancements (スペック)は全般的に修正される。",
     br [] [],
     text "group endurance 低減スペルは pulse になる。",
     ulist ["Level 2 - Saint's Resolve - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減5%.",
            "Level 12 - Saint's Energy - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減10%.",
            "Level 22 - Saint's Stamina - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減15%.",
            "Level 32 - Saint's Persistence - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減20%.",
            "Level 42 - Saint's Tenacity - Instant - 1500 range - 再使用8秒 - 10% power - エンド消費低減25%."],
     text "instant タウントスペルはスペックに移動される。",
     ulist ["Level 23 - Inflame",
            "他のレベルは削除される。"],
     text "グループレジスト pulse のレベルが変更される。",
     ulist ["Level 13 - Golestandt's Fire",
            "Level 31 - Golestandt's Breath",
            "Level 43 - Golestandt's Heart"],
     text "自己ヘイストバフはグループバフになる。",
     ulist ["Level 4 - Speed of the Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト10%.",
            "Level 14 - Alacrity of the Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト13%.",
            "Level 24 - Haste of the Archangel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト20%.",
            "Level 34 - Alacrity of the Archangel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト25%.",
            "Level 44 - Alacrity of the Heavenly Host Angel - Instant - 500 range - 持続時間30秒 - 再使用60秒 - 20% power - ヘイスト30%."],
     text "自己 Dex/Qui バフのレベルが変更される。",
     ulist ["Level 5 - Readiness",
            "Level 15 - Agility",
            "Level 25 - Precision",
            "Level 35 - Gracefulness",
            "Level 45 - Fluidity"],
     text "concentration 型のヘイストバフのレベルが変更される。",
     ulist ["Level 6 - Imbue Lesser Haste",
            "Level 16 - Imbue Greater Haste",
            "Level 26 - Imbue Lesser Alacrity",
            "Level 36 - Imbue Alacrity",
            "Level 46 - Imbue Greater Alacrity"],
     text "新しい parry 増加自己バフが追加される。",
     ulist ["Level 7 - Novice Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加2%, abs 増加3%.",
            "Level 17 - Apprentice Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加4%, abs 増加6%.",
            "Level 27 - Expert Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加6%, abs 増加9%.",
            "Level 37 - Master Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加8%, abs 増加12%.",
            "Level 47 - Grandmaster Staffman - 3.0s cast - 持続時間20分 - 10% power - parry 増加10%, abs 増加15%."],
     text "group defensive heal proc のレベルが修正される。",
     ulist ["Level 9 - Protection from Fear",
            "Level 19 - Protection from Doubt",
            "Level 29 - Protection from Anarchy",
            "Level 39 - Protection from Idleness",
            "Level 49 - Protection from Heresy"],
     text "新しい group evasion 増加バフが追加される。",
     ulist ["Level 20 - Sharpness - Instant - 持続時間20秒 - 再使用60秒 - 200 range - 15% power - evasion の確率15%アップ."],
     text "新しい自己保護スペルが追加される。",
     ulist ["Level 30 - Meditation - Instant - 持続時間5秒 - 再使用3分 - 0 power - すべての受けたダメージを50%削減し health, power, endurance を1秒ごとに5%回復する。移動、攻撃、呪文詠唱すると効果を失う。この能力は持続時間延長ボーナスの影響を受けない。"],
     text "新しいグループ保護バフが追加される。",
     ulist ["Level 50 - Tranquility - Instant - 持続時間10秒 - 再使用10分 - 1500 range - 25% power - グループが受けるすべてのダメージを15%削減し health, power, endurance を1秒ごとに5%回復する。ただし自分には効果がない。"],
     text "自己 endurance 回復 pulse は Level 3 に移動される。",
     text "自己 ABS バフは削除される。",
     text "自己 Spec AF バフは削除される。",
     text "offensive heal proc 自己バフは削除される。",
     secalb "Staff (スペック)",
     text "Staff (スペック)は全般的に修正される。",
     ulist ["Level 1 - Spinning Staff - Anytime - Low Endurance - Low Damage - No Offensive Bonus - No Defensive Bonus - 4秒毎に出血 3 ダメージ、継続20秒",
            "Level 4 - Jabbing Staff - Spinning Staff - Medium Endurance - Medium Damage - Low Offensive Bonus - Low Defensive Bonus - 10 HP回復.",
            "Level 8 - Defender's Fury - Parry - Medium Endurance - High Damage - Low Offensive Bonus - Medium Defensive Bonus - 攻撃速度デバフ20%、継続20秒",
            "Level 10 - Quick Strike - Taunt - 無変更",
            "Level 12 - Friar's Redress - Detaunt - 無変更",
            "Level 15 - Double Strike - Side - Low Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - 5秒スタン",
            "Level 18 - Friar's Friend - Back - High Endurance - Medium Damage - Medium Offensive Bonus - No Defensive Bonus - 40%スネア27秒",
            "Level 25 - Counter Evade - Evade - Medium Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - ヘイスト20%15秒",
            "Level 29 - Banish - Double Strike - Very High Endurance - High Damage - Medium Offensive Bonus - No Defensive Bonus - 175 spirit damage, 半径350",
            "Level 34 - Holy Staff - Anytime - High Endurance - Medium Damage - Low Offensive Bonus - Low Defensive Bonus - 2秒ごとに50 health グループ回復、継続10秒",
            "Level 39 - Friar's Fury - Defender's Fury Followup - Very High Endurance - High Damage - Medium Offensive Bonus - Medium Defensive Bonus - 8秒スタン",
            "Level 44 - Figure Eight - Counter Evade Followup - High Endurance - Very High Damage - High Offensive Bonus - Low Defensive Bonus - weaponskill 増加 10%",
            "Level 50 - Excommunicate - Holy Staff Followup - High Endurance - Low Damage - Low Offensive Bonus - 30 spirit damage、同時にグループ回復 125 health"]]


patch_1_121C : List (Html Message)
patch_1_121C =
    [h2 [] [text "フライアー 1.121C"],
     text "Level 50 Staff スタイル Excommunication の group heal proc の効果は 125 から 150 に増加し、範囲は 500 から 1500 になる。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "フライアー 1.122B"],
     secalb "Enhancements (基本)",
     text "Level 42 - Aura of Deflection - AF の値は 52 から 150 に増加する。"]


patch_1_122B_HotFix5 : List (Html Message)
patch_1_122B_HotFix5 =
    [h2 [] [text "フライアー 1.121B Hot Fix #5"],
     text "タウントが再び敵を妨害できるようになる。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B ++ patch_1_121C ++ patch_1_122B
      ++ patch_1_122B_HotFix5
