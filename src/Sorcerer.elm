module Sorcerer exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ソーサラー 1.121"],
     text "ソーサラーはフルリスペックされる。",
     secalb "Matter Magic (基本)",
     text "新しいDDスペルを追加",
     ulist ["Level 3 - Earth Pyre - 2.6s - 13 matter damage - 1500 range - 3 power",
            "Level 11 - Heat Pyre - 2.6s - 49 matter damage - 1500 range - 6 power",
            "Level 24 - Burning Earth - 2.6s - 85 matter damage - 1500 range - 14 power",
            "Level 35 - Molten Earth - 2.6s - 126 matter damage - 1500 range - 21 power",
            "Level 45 - Magma Crush - 2.6s - 179 matter damage - 1500 range - 30 power"],
     secalb "Body Disorientation (スペック)",
     text "AoE root の射程は延長される。",
     ulist ["Level 30 - 1655 range",
            "Level 39 - 1765 range",
            "Level 49 - 1875 range"],
     secalb "Mind Magic (スペック)",
     ulist ["Mez Dampening 自己 buff は除去される。",
            "Added group-wide power regen buffs of versions that did not have them."]]


patch_1_121C : List (Html Message)
patch_1_121C =
    [h2 [] [text "ソーサラー 1.121C"],
     secalb "Mind Magic (スペック)",
     text "以下の変化を反映するためにはリスペックが必要になる。",
     text "いくつかのスペルのレベルが変更される。",
     ulist ["Level 26 to 21 - Perspicuity of Power - Single-target power regen buff",
            "Level 27 to 22 - Circle of Perspicuity - Group power regen buff",
            "Level 36 to 30 - Cognition of Power - Single-target power regen buff",
            "Level 37 to 31 - Circle of Cognition - Group power regen buff",
            "Level 46 to 41 - Lucidity of Power - Single-target power regen buff",
            "Level 47 to 42 - Circle of Lucidity - Group power regen buff",
            "Level 49 to 46 - Brotherhood of the Mind - Mez-dampening chant"],
     text "以下の新しいスペルが追加される。",
     ulist ["Level 45 - Suggested Rage - 3.2s cast - 物理ダメージ10%増加バフ - group-targeted - 持続時間10秒 - 再使用30秒 - 20% base power - 半径1500",
            "Level 47 - Impenetrable Shield - 詠唱時間10秒(移動中でも可) - 自分に対して20分持続する AF, spec AF, ABS buff, 魔法ダメージデバフを行う。(既存のバフを上書きする。250 base AF, 275 spec AF, 30% absorb, 自分が行う魔法攻撃ダメージを40%低下。AF, spec AF, absorb バフは解除可能。一つ解除するとすべて失う。魔法ダメージデバフは解除不可能。)",
            "Level 48 - Forced Trance - instant-cast - mesmerize - single-targeted - 持続時間30秒 - 再使用600秒 - 18 power - 1500 range",
            "Level 49 - Mollifying Suggestion - 2.8s cast - ターゲットの魔法攻撃ダメージを30%低下させる - single-targeted - 持続時間30秒 - 再使用60秒 - 1500 range - 30% base power",
            "Level 50 - Mindfulness - instant-cast - quickcast タイマーをリセットする - self-targeted - 再使用60秒"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ソーサラー 1.122B"],
     secalb "Mind Magic baseline",
     text "グループスピード呪文の効果はミンストレルと同じレベルまで強化される。",
     ulist ["Level 6 - Amplify Movement - 126% から 144% に",
            "Level 16 - Amplify Running - 133% から 156% に",
            "Level 26 - Amplify Coordination - 141% から 174% に",
            "Level 36 - Amplify Equilibrium - 148% から 189% に",
            "Level 46 - Amplify Balance - 176% から 204% に"],
     text "新しくグループ waterbreath 呪文が追加される。",
     ulist ["Level 14 - Minor Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 10 power - 水中で地上の 70% の速度で移動する",
            "Level 24 - Lesser Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 15 power - 水中で地上の 80% の速度で移動する",
            "Level 34 - Greater Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 20 power - 水中で地上の 90% の速度で移動する",
            "Level 44 - Water Breath - 詠唱3秒 - 1500 range - 持続時間30分 - 25 power - 水中で地上の 100% の速度で移動する"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121C ++ patch_1_122B
