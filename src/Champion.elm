module Champion exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "チャンピオン 1.121"],
     text "チャンピオンはフルリスペックされる。",
     text "RR5 Badge of Valor の再使用タイマーは15分から10分になる。",
     sechib "Valor (スペック)",
     text "DD shout の属性は body から energy になる。",
     text "Dex/Qui debuff は自分を対象とした 20 秒間続く magic resistance buff を同時に唱える。",
     text "Str/Con debuff は同時に対象の現在および次回の bladeturn を除去する。",
     text "Haste debuff は自分のクリティカル率を20秒間3%増加させる。",
     text "Acuity debuff は自分の power を回復させる。",
     br [] [],
     text "新しい魔法が追加される。この魔法は以下の2つの魔法を同時に唱える。",
     ulist ["Level 50 - Champion's Call - 味方のダメージ属性を energy に変える - 600 半径 - 30秒間継続 - melee/archery damage のみ対象 - 再使用10分",
            "Level 50 - Call of the Champion - 30秒間継続 - 再使用10分 - 100%の確率で30% energy resistance debuff を行う offensive proc - 自分のみ対象"],
     sechib "Large Weaponry (スペック)",
     ulist ["Level 15 – Domination – Side – ダメージ増加",
            "Level 34 - Demolish - Anytime - ダメージ減少",
            "Level 39 – Shatter – Hibernian Force – ダメージ増加",
            "Level 50 - Annihilation - Rear - ダメージ増加"]]


patch_1_121B : List (Html Message)
patch_1_121B =
    [h2 [] [text "チャンピオン 1.121B"],
     text "Level 47 二次レジストバフ Against the Odds はそれよりも長時間有効なアイテムによるレジストバフを上書きしなくなる。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "チャンピオン 1.122B"],
     text "チャンピオンはフルリスペックされる。",
     sechib "Valor (スペック)",
     text "Valor ラインは調整される。削除される能力はない。ハイエンドの能力はそのまま維持される。",
     br [] [],
     text "instant snare のレベルは 1, 11, 21, 31, 41 となる。威力は変わらない。",
     br [] [],
     text "endurance 軽減チャントのレベルは 12, 22, 32, 42 のままだがレベル2に追加される。",
     br [] [],
     text "instant DD シャウトのレベルは 3, 13, 23, 33, 43 となる。威力は変わらない。",
     br [] [],
     text "Strength/Constitution バフは Dexterity/Quickness バフと統合されレベルは 4, 14, 24, 34, 44 となる。効果は変わらない。",
     br [] [],
     text "instant acuity debuff のレベルは 5, 15, 25, 35, 45 となる。威力は変わらない。",
     br [] [],
     text "instant Dexterity/Quickness debuff のレベルは 7, 17, 27, 37, 47 となる。威力は変わらない。",
     br [] [],
     text "instant haste debuff のレベルは 8, 18, 28, 38, 48 となる。威力は変わらない。",
     br [] [],
     text "instant Strength/Constitution debuff のレベルは 9, 19, 29, 39, 49 となる。威力は変わらない。",
     br [] [],
     text "Call of the Champion はレベル50のままである。",
     br [] [],
     text "新しくグループシージダメージ低減オーラが追加される。",
     ulist ["Level 6 - Champion's Ambience - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 10% 低下",
            "Level 16 - Champion's Demeanor - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 20% 低下",
            "Level 26 - Champion's Presence - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 30% 低下",
            "Level 36 - Champion's Aspect - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ 40% 低下",
            "Level 46 - Champion's Aura - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - シージダメージ50% 低下 - 同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste"],
     text "新しく siege へのグループダメージボーナスが追加される。",
     ulist ["Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。"]]


all : List (Html Message)
all = patch_1_121 ++ patch_1_121B ++ patch_1_122B
