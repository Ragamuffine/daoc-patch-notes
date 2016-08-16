module Nightshade exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ナイトシェード 1.121"],
     text "ナイトシェードはフルリスペックされる。",
     text "ナイトシェードはレルムアビリティーをリスペックされる。",
     text "スペックポイントが 2.2 から 2.8 になる。",
     text "ナイトシェードは Wild Power レルムアビリティーを習得できなくなる。",
     text "Vanish はレルムアビリティーではなく Stealth スペックに含まれる。",
     text "Mastery of Stealth はレルムアビリティーではなく Stealth スペックの Shadow Seek になる。",
     text "アサシンはレルムアビリティー Determination と Strike Prediction を選択可能になる。",
     text "アサシンから Heightened Awareness, Blood Rage, Subtlety アビリティーが除去される。",
     text "Remedy は再使用 5 分となり HP を失うことはなくなる。",
     br [] [],
     text "Viper の値が変更になる。",
     ulist ["Level 1 - 10% から 5% へ",
            "Level 2 - 20% から 10% へ",
            "Level 3 - 35% から 20% へ",
            "Level 4 - 50% から 30% へ",
            "Level 5 - 75% から 40% へ"],
     sechib "Stealth (スペック)",
     text "新しく Shadow Seek が追加される。",
     ulist ["Level 10 - Shadow Seek I - instant cast - 永久 - 5% 検知ボーナス",
            "Level 15 - Shadow Seek II - instant cast - 永久 - 10% 検知ボーナス",
            "Level 20 - Shadow Seek III - instant cast - 永久 - 15% 検知ボーナス",
            "Level 25 - Shadow Seek IV - instant cast - 永久 - 20% 検知ボーナス",
            "Level 30 - Shadow Seek V - instant cast - 永久 - 25% 検知ボーナス",
            "Level 35 - Shadow Seek VI - instant cast - 永久 - 30% 検知ボーナス",
            "Level 40 - Shadow Seek VII - instant cast - 永久 - 35% 検知ボーナス. 自動的に Shadow Seek I を得る。ステルス状態で通常移動速度の 70%",
            "Level 45 - Shadow Seek VIII - instant cast - 永久 - 40% 検知ボーナス. 自動的に Shadow Seek II を得る。ステルス状態で通常移動速度の 85%",
            "Level 50 - Shadow Seek IX - instant cast - 永久 - 45% 検知ボーナス. 自動的に Shadow Seek III を得る。ステルス状態で通常移動速度の 100%"],
     text "Detect Hidden と Assassinate アビリティーは除去される。",
     text "Save Fall V はレベル 50 から 48 になる。",
     br [] [],
     text "新しく Overshadow がレベル 49 に追加される。",
     ulist ["味方を一人ステルスにする - 10秒間継続 - 戦闘・非戦闘状態を問わず - Instant cast - 1000 range - 自分には不可 - 味方は移動できるが戦闘状態になるとステルスを失う"],
     text "Vanish レルムアビリティーが利用できる。",
     ulist ["Vanish 1 - 29 stealth - 再使用15分",
            "Vanish 2 - 39 stealth - 再使用15分",
            "Vanish 3 - 49 stealth - 再使用10分"],
     text "Vanish はステルスボーナスと引き換えに poison cure を行う。",
     text "Vanish の disarm 時間は silence と同じ15秒となる。",
     br [] [],
     text "Blur がレベル50 に追加される。",
     ulist ["ターゲットの場所に移動する - プレイヤーであること(敵味方は問わない) - 1000 range - 90s 再使用 - root/snare 状態でも可能だが CC は維持される - ステルスかどうかに関わらず使用可能 - 275 unit から 800 unit の距離のターゲットには使えない"],
     sechib "Envenom (スペック)",
     text "毒は武器に適用するアイテムではなくなった。",
     text "毒は Envenom スペックで習得する offensive proc buff である。",
     text "この offensive proc は 100% 発動しレジストできない。",
     text "この offensive proc buff はステルス中でも詠唱可能でステルス状態を維持する。",
     text "poison proc buff を持った状態で2つの武器を使用しても発動するのは一度だけである。",
     text "ただし別のターゲットに対して毒を適用することはできる。",
     text "poison proc は武器の proc と干渉しない。",
     text "クロスボーやML以外の投擲武器では proc しない。",
     text "同一ターゲットに二重に毒を適用することはできない。",
     br [] [],
     text "poison proc buff には以下の 6 種類ある。",
     ulist ["Effectiveness poison: melee dps + attack speed debuff",
            "Withering poison: disease + melee resistance debuff",
            "Stat debuff poison: weapon skill + all stats debuff",
            "Damaging poison: DoT",
            "Shadowbind poison: snare",
            "Tranquilizing poison: mesmerization"],
     text "Shadowbind と Tranquilizing 以外の毒の再使用タイマーは 7 秒である。",
     text "Shadowbind と Tranquilizing は独立したタイマーを持ち、それぞれ 7 秒と 25 秒である。",
     text "mezz poison は Spymaster から除去される。",
     br [] [],
     text "Effectiveness Poison: ターゲットの物理攻撃ダメージと攻撃スピードの debuff. 20 秒継続。",
     ulist ["3 Envenom - Minor Essence of Lethargy. melee damage 4% attack speed 5%.",
            "13 Envenom - Weak Essence of Lethargy. melee damage 6% attack speed 10%.",
            "23 Envenom - Essence of Lethargy. melee damage 10% attack speed 15%.",
            "33 Envenom - Major Essence of Lethargy. melee damage 15% attack speed 20%.",
            "43 Envenom - Swordbreaker. melee damage 20% attack speed by 25%."],
     text "Withering Poison: disease. 15 秒継続。",
     ulist ["4 Envenom - Minor Widow Sting. Diseased, 15% slow strength 5",
            "16 Envenom - Widow Sting. Diseased, 15% slow strength 10.",
            "26 Envenom - Widow Toxin. Diseased, 15% slow, strength 15, melee resistance 5%.",
            "36 Envenom - Widow Toxin. Diseased, 15% slow, strength 20, melee resistance 10%.",
            "46 Envenom - Widow Venom. Diseased, 15% slow, strength 25, melee resistance 20%."],
     text "Stat debuff Poison: Weaponskill, Dexterity, Strength, Constitution debuff. 30 秒間継続。",
     ulist ["7 Envenom - Weakening Poison. WS 5%, stat 13.",
            "17 Envenom - Inhibiting Poison. WS 8%, stat 24.",
            "27 Envenom - Enervating Poison. WS 10%, stat 30.",
            "37 Envenom - Unnerving Poison. WS 14%, stat 41.",
            "47 Envenom - Touch of Death. WS 19%, stat 60."],
     text "Snare Poison: snare poison には root/snare タイマーが適用されない。再使用すると上書きされる。",
     ulist ["9 Envenom - Crippling Toxin. Snare 15%, 4 秒間",
            "29 Envenom - Snaring Toxin. Snare 35%, 6 秒間",
            "49 Envenom - Shadowbind. Snare 60%, 9 秒間"],
     text "Mez Poison: 再使用時間25秒で独立したタイマーを持つ。この poison は bodyguard されているターゲットにも有効。半径 500 内のすべてのターゲットに有効で mezz 時間短縮バフの影響を受けない。mez poison は他の poison と違って同じターゲットに再適用できる。",
     ulist ["18 Envenom - Tranquilizing Gas - 5秒間継続 PBAoE mez.",
            "46 Envenom - Tranquilizing Miasma - 15秒間継続 PBAoE mez."],
     text "Damage-over-Time Poison: 20 秒間継続。",
     ulist ["1 Envenom - Minor Lethal Poison. 9 body damage, 3.9 秒ごと",
            "5 Envenom - Lesser Lethal Poison. 15 body damage every 3.9 seconds.",
            "10 Envenom - Lethal Poison. 22 body damage every 3.9 seconds.",
            "15 Envenom - Major Lethal Poison. 29 body damage 3.9 seconds.",
            "20 Envenom - Greater Lethal Poison. 36 body damage 3.9 seconds.",
            "25 Envenom - Minor Lethal Venom. 36 body damage, 14 matter damage, 3.9 秒ごと",
            "30 Envenom - Lesser Lethal Venom. 38 body damage, 22 matter damage, 3.9 秒ごと",
            "35 Envenom - Major Lethal Venom. 42 body damage, 30 matter damage, 3.9 秒ごと",
            "40 Envenom - Greater Lethal Venom. 50 body damage, 39 matter damage, 3.9 秒ごと",
            "45 Envenom - Insidious Lethal Venom. 72 body damage, 48 matter damage, 3.9 秒ごと",
            "50 Envenom - Lifebane. 88 body damage, 55 matter damage, 3.9 秒ごと"],
     sechib "Critical Strike (スペック)",
     text "Armor Wither はレジスト不可になる。",
     ulist ["Level 8 - Pincer - Side - 4s melee stun",
            "Level 10 - Backstab 2 - Rear - ダメージやや増加",
            "Level 12 - Hamstring - Evade - 20% attack speed debuff, ダメージやや増加",
            "Level 18 - Garrote - Anytime - 14 damage bleed, ダメージ減少",
            "Level 21 - Perforate Artery - Frontal stealth - ダメージかなり増加, 10秒間継続 armor wither",
            "Level 25 - Achilles Heel - rear - 10秒間継続 armor wither, ダメージ増加",
            "Level 29 - Leaper - Pincer - 1% ABS debuff, ダメージやや増加",
            "Level 39 - Stunning Stab - Creeping Death - 3% ABS debuff",
            "Level 44 - Rib Separation - Achilles Heel - 7s melee stun, ダメージかなり増加",
            "Level 45 - Incapacitate style は除去される。",
            "Level 46 - Neck Shot - anytime - ダメージやや軽減, helm armor slot",
            "Level 47 - Rib Shot - anytime - ダメージやや軽減, chest armor slot",
            "Level 48 - Hip Shot - anytime - ダメージやや軽減, leggings armor slot",
            "Level 50 - Ripper - Garrote - 20秒間継続 armor wither, ダメージやや増加"],
     sechib "Celtic Dual (スペック)",
     ulist ["Level 15 - Thunderstorm - Detaunt anytime - Defensive bonus とダメージを他の detaunt スタイル並に減少",
            "Level 21 - Hurricane - Rear - スネア削除, ダメージやや増加",
            "Level 29 - Tempest - Ice Storm - ダメージやや増加",
            "Level 34 - Meteor Shower - Anytime - ダメージ減少",
            "Level 50 - Supernova - Hurricane - ダメージやや増加, 7秒スタン"],
     sechib "Pierce (スペック)",
     ulist ["Level 12 - Black Widow - Rear - スネア削除, ダメージやや増加",
            "Level 34 - Asp's Bite - Anytime - ダメージ減少"],
     sechib "Blades (スペック)",
     ulist ["Level 34 - Revenging Blade - Rear - スネア削除, ダメージやや増加",
            "Level 44 - Prismatic Blade - Anytime - ダメージ減少"]]
