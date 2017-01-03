module Necromancer exposing (..)

import Html exposing (..)
import Html.Attributes exposing (class)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "ネクロマンサー 1.121"],
     text "ネクロマンサーはフルリスペックされる。",
     secalb "Death Servant (スペック)",
     text "新しい shade-cast PBAoE スペルを追加",
     ulist ["Level 47 - Necrotic Conduit - 225 damage, 350 半径 PBAoE - 20% power cost - 3s shade-cast, pet instant-cast - shade は pet から 250 以内でなければならない"],
     text "これまでの level 47 PBAoE スペル, Channeled Frenzy, は level 46 になる。"]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "ネクロマンサー 1.122B"],
     secalb "概略",
     text "ネクロマンサーはスペックごとに3つの「クラス」を持つとさえ言える。純キャスター、物理/キャスターハイブリッド、ペットキャスター。以前のネクロマンサーはシェード状態の本体は無敵でペットを制御するクラスであったがそのような特徴はもはやない。物理攻撃を行うスペックが導入されたことから STR や QUICKNESS を上げる装備が必要に感じるかもしれないが単純化のため物理ダメージと weaponskill は INT により計算される。新しいネクロマンサー向けのアイテムは今後導入される。",
     br [] [],
     text "ネクロマンサーはフルリスペックされる。",
     text "ネクロマンサーはレルムアビリティーをリスペックされる。",
     text "ネクロマンサーはチャンピオンアビリティーをリスペックされる。",
     text "マスターレベルアビリティーはログイン時に自動的にリスペックされる。",
     secalb "Master Levels",
     ulist ["Warlord", "Convoker"],
     secalb "Realm Abilities",
     ulist ["Augmented Strength",
            "Augmented Dexterity",
            "Augmented Constitution",
            "Augmented Quickness",
            "Augmented Acuity",
            "Long Wind",
            "Serenity",
            "Toughness",
            "Ethereal Bond",
            "Avoidance of Magic",
            "Lifter",
            "Veil Recovery",
            "Mastery of Pain",
            "Mastery of Magery",
            "Mastery of Focus",
            "Mastery of Parrying",
            "Wild Power",
            "Wild Minion",
            "Determination",
            "First Aid",
            "Second Wind",
            "Ignore Pain",
            "Mastery of Concentration",
            "Concentration",
            "The Empty Mind",
            "Mystic Crystal Lore",
            "Raging Power",
            "Soldier's Barricade",
            "Volcanic Pillar",
            "Negative Maelstrom",
            "Ichor of the Deep",
            "Juggernaut",
            "Dual Threat",
            "Purge"],
     secalb "Realm Rank 5",
     ulist ["Call of Darkness - Instant cast - 持続時間45秒 - 再使用10分 - すべての form の利益を得る。さらに form のボーナスは 10% 増加する。ただし RR5 終了時に自動的に元の form には戻らない。"],
     secalb "General",
     text "ネクロマンサーの King 装備および Epic 装備の proc とアビリティーは他のクラスに沿って調整される。",
     br [] [],
     text "新しいアビリティーが追加される。",
     ulist ["Revert Form - Instant cast - 再使用2秒 - 元の form に戻る。"],
     secalb "Deathsight (基本)",
     text "新しい form が追加される。",
     ulist ["Level 1 - Decrepit Form - Instant cast - 20% power - 再使用2秒 - Decrepit Magus になる。魔法ダメージ10%増加。ABS+5増加。物理攻撃した対象は病気になる。戦闘中であっても高い比率で体力が自然回復する。"],
     text "新しい単体 DoT が追加される。",
     ulist ["Level 2 - Locust Flock - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 2 matter damage",
            "Level 12 - Locust Cloud - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 10 matter damage",
            "Level 22 - Locust Mass - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 29 matter damage",
            "Level 32 - Locust Horde - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 69 matter damage",
            "Level 42 - Locust Flock - 詠唱2.4秒 - 1500 range - 持続時間10秒 - 2秒ごと - 102 matter damage"],
     text "新しい単体ライフタップが追加される。",
     ulist ["Level 3 - Lifeforce Evacuation - 詠唱2.5秒 - 1500 range - 3 power - 17 spirit damage ダメージの50%を回復",
            "Level 9 - Spirit Evacuation - 詠唱2.5秒 - 1500 range - 5 power - 33 spirit damage ダメージの50%を回復",
            "Level 19 - Vitality Theft - 詠唱2.5秒 - 1500 range - 13 power - 73 spirit damage ダメージの50%を回復",
            "Level 29 - Theft of Vigor - 詠唱2.5秒 - 1500 range - 18 power - 92 spirit damage ダメージの50%を回復",
            "Level 39 - Theft of Energy - 詠唱2.5秒 - 1500 range - 24 power - 126 spirit damage ダメージの50%を回復",
            "Level 49 - Theft of Liveliness - 詠唱2.5秒 - 1500 range - 33 power - 179 spirit damage ダメージの50%を回復"],
     text "新しい設置型スペルが追加される。",
     ulist ["Level 6 - Decrepit Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 20 power - 2秒ごとに10% slow",
            "Level 16 - Wretched Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 30 power - 2秒ごとに20% slow",
            "Level 26 - Rotting Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 45 power - 2秒ごとに40% slow",
            "Level 36 - Desecrated Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 62 power - 2秒ごとに55% slow",
            "Level 46 - Decrepit Ground - Instant cast - 再使用30秒 - 1250 range - 半径250 - 持続時間30秒 - 75 power - 2秒ごとに75% slow"],
     text "すべての設置型スペルは共通のタイマーを持つ。同時に一つのスペルのみが有効である。duration ボーナスは設置型スペルに影響しない。",
     secalb "Deathsight (スペック)",
     text "新しく AoE DoT スペルが追加される。",
     ulist ["Level 1 - Billowing Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 6 power - 2 spirit damage",
            "Level 7 - Flowing Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 5秒ごと - 18 power -17 spirit damage",
            "Level 17 - Unending Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 30 power - 30 spirit damage",
            "Level 27 - Swelling Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 4秒ごと - 42 power - 60 spirit damage",
            "Level 37 - Heightening Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 3秒ごと - 50 power - 88 spirit damage",
            "Level 47 - Infinite Death - 詠唱時間3秒 - 1500 range - 半径350 - 持続時間20秒 - 2.5秒ごと - 64 power - 131 spirit damage"],
     text "新しい単体 slow が追加される。",
     ulist ["Level 2 - Crippling Exhaustion - Instant cast - 再使用3分 - 1500 range - 持続時間30秒 - 25% power - slow 10%",
            "Level 12 - Constricting Exhaustion - Instant cast - 再使用3分 - 1500 range - 持続時間30秒 - 25% power - slow 15%",
            "Level 22 - Disabling Exhaustion - Instant cast - 再使用2分 - 1500 range - 持続時間30秒 - 25% power - slow 20%",
            "Level 32 - Debilitating Exhaustion - Instant cast - 再使用60秒 - 1500 range - 持続時間30秒 - 25% power - slow 25%",
            "Level 42 - Snaring Exhaustion - Instant cast - 再使用60秒 - 1500 range - 持続時間30秒 - 25% power - slow 30%"],
     text "新しく単体 AF デバフが追加される。",
     ulist ["Level 3 - Glimpse of the Inevitable - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 8 power - AF 25 低下",
            "Level 13 - Glimpse of Chaos - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 17 power - AF 55 低下",
            "Level 23 - Glimpse of the Grave - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 25 power - AF 100 低下",
            "Level 33 - Glimpse of Nightmares - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 36 power - AF 165 低下",
            "Level 43 - Glimpse of Death - 詠唱時間3秒 - 1500 range - 持続時間45秒 - 50 power - AF 250 低下"],
     text "新しく PBAoE スペルが追加される。",
     ulist ["Level 5 - Channeled Anger - 詠唱2.5秒 - 半径300 - 22 power - 52 spirit damage",
            "Level 15 - Channeled Hatred - 詠唱2.5秒 - 半径300 - 30 power - 104 spirit damage",
            "Level 25 - Channeled Fury - 詠唱2.5秒 - 半径300 - 46 power - 176 spirit damage",
            "Level 35 - Channeled Wrath - 詠唱2.5秒 - 半径300 - 58 power - 265 spirit damage",
            "Level 45 - Channeled Frenzy - 詠唱2.5秒 - 半径300 - 70 power - 325 spirit damage"],
     text "新しく単体 root が追加される。Albion の root はすべて energy 属性。",
     ulist ["Level 9 - Minor Body Lock - 詠唱2.5秒 - 1500 range - 持続時間7秒 - 15 power",
            "Level 19 - Lesser Body Lock - 詠唱2.5秒 - 1500 range - 持続時間19秒 - 28 power",
            "Level 29 - Body Lock - 詠唱2.5秒 - 1500 range - 持続時間48秒 - 48 power",
            "Level 39 - Greater Body Lock - 詠唱2.5秒 - 1500 range - 持続時間61秒 - 60 power",
            "Level 49 - Superior Body Lock - 詠唱2.5秒 - 1500 range - 持続時間73秒 - 72 power"],
     text "新しい魔法クリティカルグループオーラが追加される。",
     ulist ["Level 6 - Magic Empowerment - 詠唱時間3秒 - 1500 range - 24 power + 5/tick - すべての魔法のクリティカル確率を1%増加",
            "Level 16 - Evil Empowerment - 詠唱時間3秒 - 1500 range - 40 power + 8/tick - すべての魔法のクリティカル確率を2%増加",
            "Level 26 - Dark Empowerment - 詠唱時間3秒 - 1500 range - 60 power + 10/tick - すべての魔法のクリティカル確率を3%増加",
            "Level 36 - Deadly Empowerment - 詠唱時間3秒 - 1500 range - 80 power + 15/tick - すべての魔法のクリティカル確率を4%増加",
            "Level 46 - Necrotic Empowerment - 詠唱時間3秒 - 1500 range - 100 power + 25/tick - すべての魔法のクリティカル確率を5%増加"],
     text "ブレードターンが追加される。",
     ulist ["Level 23 - Death Bladeturn - 詠唱4秒 - 持続時間20分 - 8% power - 物理攻撃を一度だけ吸収する。"],
     text "新しい form が追加される。",
     ulist ["Level 50 - Bringer of Death - Instant cast - 再使用15分 - 持続時間25秒 - 0 power - Bringer of Death になる。魔法の妨害を受けなくなる。あらゆるダメージを30%低減する。スピードワープ、戦闘中であっても移動速度は25%増加する。Decrepit Form のすべてのボーナスは有効である。"],
     secalb "Painworking (基本)",
     text "新しい form が追加される。",
     ulist ["Level 8 - Chthonic Form - Instant cast - 20% power - 再使用2秒 - Chthonic Knight になる。最大HPが30%増加する。ABS+25される。parry アビリティーが追加される。weaponskill がレベル50で50%増加する。AF が250増加する。AFを除いてこれらの数値は Painworking スペックに比例する。"],
     text "新しく constitution デバフが追加される。",
     ulist ["Level 4 - Dark Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 5 power - constitution 11 低下",
            "Level 14 - Vile Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 20 power - constitution 18 低下",
            "Level 24 - Mind Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 28 power - constitution 25 低下",
            "Level 34 - Evil Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 34 power - constitution 31 低下",
            "Level 44 - Demon Horror - Instant cast - 再使用7秒 - 1500 range - 持続時間45秒 - 48 power - constitution 41 低下"],
     text "新しくダメージシールドが追加される。",
     ulist ["Level 7 - Edge of Hatred - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象に 5.8 spirit damage",
            "Level 17 - Eviscerating Protector - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 8.9 spirit damage",
            "Level 27 - Knives of Death - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 11.6 spirit damage",
            "Level 37 - Flaying Shield - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象にDeals 15.3 spirit damage",
            "Level 47 - Soul Sundering Shield - 詠唱2.2秒 - 持続時間20分 - 20% power - 物理攻撃する対象に 21.1 spirit damage"],
     text "新しい設置型スペルが追加される。",
     ulist ["Level 1 - Icy Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 12 power - 3秒ごとに 8 cold damage 最大16体まで",
            "Level 11 - Chilling Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 28 power - 3秒ごとに 66 cold damage 最大16体まで",
            "Level 21 - Frigid Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 45 power - 3秒ごとに 129 cold damage 最大16体まで",
            "Level 31 - Numbing Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 54 power - 3秒ごとに 192 cold damage 最大16体まで",
            "Level 41 - Freezing Ground - Instant Cast - 再使用30秒 - 200 range - 半径200 - 持続時間30秒 - 62 power - 3秒ごとに 252 cold damage 最大16体まで"],
     text "すべての設置型スペルは再使用タイマーを共有する。同時に一つの設置型スペルのみ有効である。duration ボーナスは設置型スペルには効果がない。",
     secalb "Painworking (スペック)",
     text "新しく単体 slow が追加される。",
     ulist ["Level 11 - Ice Bond - 1000 range - 持続時間1秒 - 再使用60秒 - 10% power - slow 80%",
            "Level 21 - Ice Cable - 1000 range - 持続時間2秒 - 再使用60秒 - 10% power - slow 80%",
            "Level 31 - Ice Chain - 1000 range - 持続時間3秒 - 再使用60秒 - 10% power - slow 80%",
            "Level 41 - Ice Bracelet- 1000 range - 持続時間4秒 - 再使用60秒 - 10% power - slow 80%"],
     text "新しく魔法抵抗増加スペルが追加される。",
     ulist ["Level 2 - Anti-Magic Skin - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗10%増加",
            "Level 12 - Anti-Magic Shell - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗20%増加",
            "Level 22 - Anti-Magic Armor - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗30%増加",
            "Level 32 - Anti-Magic Wall - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗40%増加",
            "Level 42 - Anti-Magic Barrier - Instant Cast - 再使用10分 - 持続時間15秒 - 10% power - 魔法抵抗50%増加"],
     text "新しく魔法吸収パルスが追加される。",
     ulist ["Level 4 - Soul of Magic - Instant cast - 持続時間30秒 - 30秒ごと - 15% power + 5/tick - 次に受けた魔法攻撃は回復になる",
            "Level 14 - Sense of Magic - Instant cast - 持続時間25秒 - 25秒ごと - 15% power + 8/tick - 次に受けた魔法攻撃は回復になる",
            "Level 24 - Awareness of Magic - Instant cast - 持続時間20秒 - 20秒ごと - 15% power + 10/tick - 次に受けた魔法攻撃は回復になる",
            "Level 34 - Expectancy of Magic - Instant cast - 14s duration - 14秒ごと - 15% power + 12/tick - 次に受けた魔法攻撃は回復になる",
            "Level 44 - Way of Magic - Instant cast - 持続時間9秒 - 9秒ごと - 15% power + 15/tick - 次に受けた魔法攻撃は回復になる"],
     text "新しく自己 parry 強化スペルが追加される。",
     ulist ["Level 5 - Nails of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 8 power - parry 確率 30% 増加",
            "Level 15 - Barbs of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 22 power - parry 確率 35% 増加",
            "Level 25 - Fangs of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 30 power - parry 確率 40% 増加",
            "Level 35 - Blades of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 42 power - parry 確率 45% 増加",
            "Level 45 - Swords of Arawn - Instant Cast - 再使用3分 - 持続時間15秒 - 50 power - parry 確率が 60% になる"],
     text "新しく単体デバフ耐性スペルが追加される。",
     ulist ["Level 9 - Ignore Weakness - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は25%の確率でデバフを無効化",
            "Level 19 - Ignore Debilitation - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は35%の確率でデバフを無効化",
            "Level 29 - Ignore Infirmity - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は50%の確率でデバフを無効化",
            "Level 39 - Ignore Impunities - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は70%の確率でデバフを無効化",
            "Level 49 - Ignore Depletion - Instant Cast - 1500 range - 持続時間45秒 - 再使用90秒 - 10% power - 味方は100%の確率でデバフを無効化"],
     text "新しい melee スタイルが追加される。",
     ulist ["Level 1 - Villainous Strike - Anytime - Medium Endurance - Medium Damage - Low Hit Bonus - No Defensive Bonus - ターゲットのAFは1%低下する。何度でも重複する。",
            "Level 3 - Chilling Touch - High Endurance - Medium Damage - No Hit Bonus - Medium Defensive Penalty - 10秒間 5% の確率で evade",
            "Level 13 - Shadow Beckon - Taunt - Low Endurance - No Hit Bonus - Low Defensive Bonus - 脅威度200増加",
            "Level 16 - Arctic Death - Parry - Medium Endurance - High Damage - Medium Offensive Bonus - Low Defensive Bonus - ターゲットの攻撃速度が20秒間18%低下(バグ: このスキルはトレーニング直後は見えない。リログがゾーンが必要。)",
            "Level 23 - Icebringer - Side - Medium Endurance - High Damage - Medium Hit Bonus - No Defensive Bonus - ターゲットに病気を与える。20秒間 slow 15%, STR 15低下、ヒール効率50%低下",
            "Level 26 - Vanquisher - Follows Return Death - Very High Damage - High Hit Bonus - No Defensive Bonus - ターゲットから ablative shield をすべて除去する",
            "Level 33 - Icy Cleave - Front - Very High Endurance - Medium Damage - No Hit Bonus - Medium Defensive Bonus - 前方の敵すべてに 55 cold damage を与える。脅威度 50 増加",
            "Level 36 - Frozen Edge - Behind - Medium Endurance - High Damage - Medium Hit Bonus - No Defensive Bonus - ターゲットの cold resistances を15秒間 45% 低下",
            "Level 43 - Frostbite - Follows Icebringer - Low Endurance - Very High Damage - Medium Hit Bonus - Low Defensive Bonus - 7秒スタン",
            "Level 46 - Deathseeker - Follows Frozen Edge - High Endurance - Very High Damage - High Hot Bonus - No Defensive Bonus - ターゲットは出血し 10秒間 2秒ごとに 100 cold damage"],
     text "新しいペットが追加される。",
     ulist ["Level 40 - Summon Death Shredder - Instant Cast - 持続時間60秒 - 20% power - 再使用5分 - Death Shredder を召喚する。Death Shredder は melee dps に特化したペットであり、ブレードターンバフを持っている。ペットは召喚者のレベルと等しい。"],
     text "新しく単体 AoE DoT/slowスペルが追加される。",
     ulist ["Level 7 - Freezing Hold - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用60秒 - 12 power - 2秒ごと 5 cold damage",
            "Level 17 - Freezing Grasp - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用60秒 - 24 power - 2秒ごと 11 cold damage 5% slow",
            "Level 27 - Freezing Terror - Instant cast - 500 range - 半径250 - 持続時間10秒 - 再使用30秒 - 38 power - 2秒ごと 30 cold damage 10% slow",
            "Level 37 - Freezing Clench - Instant cast - 500 range - 半径250 - 持続時間10秒 - 15s reuse - 52 power - 2秒ごと 74 cold damage 15% slow",
            "Level 47 - Freezing Howl - Instant cast - 500 range - 半径250 - 持続時間10秒 - 15s reuse - 65 power - 1.5秒ごと 132 cold damage 25% slow"],
     text "新しく武器召喚スペルが追加される。",
     ulist ["Level 1 - Conjure Icebrand - 詠唱10秒 - 25% power - Chthonic Blade を召喚する。ダメージ属性は cold",
            "Level 50 - Nethersbane - 詠唱20秒 - 50% power - アラウンの邪悪な剣 Nethersbane を召喚する。ダメージ属性は cold である。weaponskill とスタイルダメージは Painworking スペックと Intelligence に依存する。Nethersbane は時間の経過につれて強化され最強の両手剣と同等の性能になる。ネクロマンサーが装備できるのは杖と召喚武器のみである。Nethersbane はログアウト時に消滅する。"],
     secalb "Death Servant (基本)",
     text "新しい form が追加される。",
     ul [class "uk-list uk-list-striped"]
         [text "Level 30 - Spirit Form - Instant cast - 20% power - 再使用2秒 - Ghostly Spirit になる。受けたダメージの 10% をパワーに変換する。パワー regeneration が大きく強化されている。隠れた敵を容易に発見できる。それに加え、ペットはより強力な能力と形態を持つ。",
          ulist ["Spirit Form でいる間はペットのレジストは55%まで増加する。このレジストはクレリック/フライアーのレジストと重複しない。",
                 "ペットはどの形態であっても通常形態の能力とボーナスを持ったままでいる。",
                 "Spirit Form を解くとペットは通常形態に戻る。",
                 "Spirit Form は本質的にチャントであり長時間スタンまたは mezz 状態であればペットのコントロールを失う。またペットとの距離が離れすぎてもコントロールを失う。再び条件が満たされればコントロールを取り戻す。"]],
     text "ペットは召喚者と同じレベルになる。ペットはレベルに応じて能力も向上する。",
     br [] [],
     text "召喚者が人間、Decrepit Form, Spirit Form である時のみペットを召喚できる。Chthonic Form ではペットを召喚できない。またすでにペットがいればコントロールを失う。",
     br [] [],
     text "新しいペットが追加される。",
     ulist ["Level 5 - Summon Aegis - 詠唱6秒 - 40% power - このペットはタンクである。他のAFバフとスタックするAFバフを持つ。スラッシュ属性の物理スタイル Umbral Slash でタウントする。",
            "Spirit Form ではペットの魔法レジストが増加する。物理攻撃速度が上がる。Umbral Slash は Spirit Slash となり半径200の範囲に 80 heat DD を proc する。",
            "Level 15 - Summon Soultorn - 詠唱6秒 - 40% power - このペットは魔法攻撃に特化している。matter スネア DD で攻撃する。matter デバフも行う。このペットを妨害することはできない。",
            "Spirit Form ではすべてのティックが妨害を行う matter DoT を詠唱する。同様に病気とスネアも行う。1 ティックが通常形態の 1 DD に等しい。このペットはとても脆い。",
            "Level 25 - Summon Fiend - 詠唱6秒 - 40% power - このペットは高速で移動し物理攻撃を行う。物理スタイル Fanatic Slash は高ダメージを与える。",
            "Spirit Form では Fanatic Slash は Rabid Swipe になりターゲットに対して ABS デバフ 35%, AF デバフ 150 を行う。ダメージも増加する。Frenzy Swipes は 5 秒背後スタンでかつ高ダメージを与える。このペットは戦闘中やスピードワープの中でも速度が変わらない。",
            "Level 35 - Summon Priest - 詠唱6秒 - 40% power - このペットはグループをサポートするペットである。味方単体の体力、スタミナ、パワーを回復する。このペットは妨害可能である。",
            "Spirit Form ではヒールだけではなく病気、毒、近視、蘇生痕の回復も行う。",
            "Level 45 - Summon Succubus - 詠唱6秒 - 40% power - このペットはクラウドコントロールを行う。射程1250、持続時間46秒の単体 mezz を行う。このペットは妨害することができない。",
            "Spirit Form では射程1500、持続時間72秒の AoE mezz を行う。AoE Dex/Qui デバフも行う。自分の近視を回復する。"],
     text "新しく heal over time が追加される。",
     ulist ["Level 1 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 4 回復",
            "Level 8 - Regenerate Blood - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 9 回復",
            "Level 18 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 27 回復",
            "Level 28 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 51 回復",
            "Level 38 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 61 回復",
            "Level 48 - Regenerate Flesh - Instant cast - 再使用30秒 - 2000 range - 持続時間15秒 - 10% power - 詠唱者とペットは3秒ごとに 76 回復"],
     text "新しくパワードレインが追加される。",
     ulist ["Level 7 - Power Drain - Instant cast - 再使用20秒 - 1500 range - 29 spirit damage 与えたダメージの 250% をパワーとして得る",
            "Level 17 - Power Vacuum - Instant cast - 再使用20秒 - 1500 range - 68 spirit damage 与えたダメージの 250% をパワーとして得る",
            "Level 27 - Power Leech - Instant cast - 再使用20秒 - 1500 range - 29 spirit damage 与えたダメージの 250% をパワーとして得る",
            "Level 37 - Power Siphon - Instant cast - 再使用20秒 - 1500 range - 124 spirit damage 与えたダメージの 250% をパワーとして得る",
            "Level 47 - Power Absorb - Instant cast - 再使用20秒 - 1500 range - 159 spirit damage 与えたダメージの 250% をパワーとして得る"],
     text "新しい設置型スペルを追加する。",
     ulist ["Level 4 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 20 power - 持続時間30秒 - すべての味方は6秒ごとに 5 パワーを得る。戦闘中でも有効。",
            "Level 14 - Infused Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 44 power - 持続時間30秒 - すべての味方は6秒ごとに 11 パワーを得る。戦闘中でも有効。",
            "Level 24 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 65 power - 持続時間30秒 - すべての味方は6秒ごとに 20 パワーを得る。戦闘中でも有効。",
            "Level 34 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 80 power - 持続時間30秒 - すべての味方は6秒ごとに 28 パワーを得る。戦闘中でも有効。",
            "Level 44 - Enchanted Ground - Instant Cast - 再使用30秒 - 2000 range - 半径150 - 100 power - 持続時間30秒 - すべての味方は6秒ごとに 35 パワーを得る。戦闘中でも有効。"],
     text "すべての設置型スペルはタイマーを共有する。同時に一つの設置型スペルのみが有効である。duration ボーナスは設置型スペルには効果がない。",
     secalb "Death Servant (スペック)",
     text "新しく単体パワー転送スペルが追加される。",
     ulist ["Level 1 - Gift of Power - 詠唱時間3秒 - 1500 range - ターゲットに 25 power 転送する。",
            "Level 11 - Gift of Essence - 詠唱時間3秒 - 1500 range - ターゲットに 40 power 転送する。",
            "Level 21 - Gift of Force - 詠唱時間3秒 - 1500 range - ターゲットに 70 power 転送する。",
            "Level 31 - Gift of Vim - 詠唱時間3秒 - 1500 range - ターゲットに 105 power 転送する。",
            "Level 41 - Gift of Arawn - 詠唱時間3秒 - 1500 range - ターゲットに 150 power 転送する。"],
     text "新しく単体ペット fear (退散後に60秒の無効時間が発生する)が追加される。",
     ulist ["Level 2 - Fear Servant - 詠唱2.6秒 - 1500 range - 持続時間5秒 - 6 power - 敵ペット一体を退散させる。退散中はマスターの指示は無効になる。",
            "Level 12 - Expel Servant - 詠唱2.6秒 - 1500 range - 持続時間13秒 - 15 power - Send an enemy pet running in fear, causing its master to lose control.",
            "Level 22 - Intimidate Servant - 詠唱2.6秒 - 1500 range - 持続時間21秒 - 26 power - Send an enemy pet running in fear, causing its master to lose control.",
            "Level 32 - Daunt Servant - 詠唱2.6秒 - 1500 range - 持続時間30秒 - 35 power - Send an enemy pet running in fear, causing its master to lose control.",
            "Level 42 - Terrify Servant - 詠唱2.6秒 - 1500 range - 持続時間42秒 - 43 power - Send an enemy pet running in fear, causing its master to lose control."],
     text "新しく単体ボルト呪文が追加される。",
     ulist ["Level 4 - Power Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 30 power - 23 spirit damage",
            "Level 14 - Focus Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 100% power - 50 spirit damage",
            "Level 24 - Essence Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 100% power - 156 spirit damage",
            "Level 34 - Death Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 110% power - 250 spirit damage",
            "Level 44 - Final Blast - 詠唱2秒 - 2000 range - 再使用15秒 - 133% power - 317 spirit damage"],
     text "新しく単体ABSバフが追加される。",
     ulist ["Level 8 - Ambition for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +1",
            "Level 18 - Hunger for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +2",
            "Level 28 - Longing for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +5",
            "Level 38 - Communion for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +7",
            "Level 48 - Intimacy for Death - 詠唱時間3秒 - 1500 range - 20% power - 持続時間20分 - ABS +10"],
     text "新しく単体 DD/スネアが追加される。",
     ulist ["Level 9 - Plague Burst - 詠唱2.8秒 - 1500 range - 6 power - 34 matter damage 5% snare",
            "Level 19 - Plague Trap - 詠唱2.8秒 - 1500 range - 14 power - 68 matter damage 15% snare",
            "Level 29 - Plague Torrent - 詠唱2.8秒 - 1500 range - 30 power - 122 matter damage 20% snare",
            "Level 39 - Plague Barrage - 詠唱2.8秒 - 1500 range - 46 power - 153 matter damage 35% snare",
            "Level 49 - Plague Surge - 詠唱2.8秒 - 1500 range - 66 power - 199 matter damage 50% snare"],
     text "ブレードターンが追加される。",
     ulist ["Level 23 - Death Bladeturn - 詠唱4秒 - 持続時間20分 - 8% power - 物理攻撃を一度だけ吸収する。"],
     text "新しく PBAoE パワードレインが追加される。",
     ulist ["Level 25 - Power Vortex - Self - Instant cast - 再使用30秒 - 半径350 - 100 damage 100 power"],
     text "新しくパワーシールドが追加される。",
     ulist ["Level 35 - Power Shield - Instant cast - 永久 - 詠唱者の体力が50%を切ると50%を超えるまでパワーが体力に変換される。"],
     text "新しく単体グラップルが追加される。",
     ulist ["Level 45 - Power Lock - Instant cast - 350 range - 持続時間10秒 - 再使用90秒 - 自分とターゲットの場所を固定する。毎秒50パワーをターゲットから吸収する。自分とターゲットは物理ダメージを受けない。"],
     text "新しく打ちっ放し型のペットを召喚する。",
     ulist ["Level 50 - Arawn's Legion - 詠唱時間15秒 - 再使用10分 - 半径2000 - 0 power - 持続時間45秒 - ペットの軍団を召喚する。ペットは範囲内の敵を攻撃する。ペットの種類は物理型からキャスター型まで多岐にわたる。"]]


patch_1_122B_HotFix : List (Html Message)
patch_1_122B_HotFix =
    [h2 [] [text "ネクロマンサー 1.122B Hot Fix"],
     text "Revert Form はスキルリストに正しく表示される。",
     br [] [],
     text "設置型スペル(〜 Ground)はターゲットの場所に設置され設置直後から半径内で有効になる。設置後はパルスのタイミングで効果を発する。",
     br [] [],
     text "Chthonic Form はすべてのレベルで正しく parry と weaponskill を得る。召喚したペットを正しくリリースする。",
     br [] [],
     text "Decrepit Form の health regen はレベル50では変わらないがレベルが下がるごとに効果は低下する。バトルグラウンドで効力が強すぎたため調整される。",
     br [] [],
     text "Power Lock は正しく詠唱者をスタンするようになる。このスタンはパージ不能で耐性もつかない。"]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "ネクロマンサー 1.122B Hot Fix #2"],
     text "Chthonic Form がランダムに解除されることがなくなる。",
     text "Painworking の parry バフの低レベルのものは Chthonic Form 固有の parry 確率を正しく書き換えるようになる。",
     text "Nethersbane はログアウト時に正しく消滅するようになる。また Painworking のレベルが50未満で装備しようとした場合も消滅する。",
     text "Death Servant のボルトのダメージが大きすぎたバグが修正される。",
     text "Spirit Form のステルス検知半径は Death Servant のスキル値に影響を受けるようになる。",
     text "すべてのヒールペットがヒールし始める閾値を体力の90%から75%に減少させる。"]


patch_1_122B_HotFix3 : List (Html Message)
patch_1_122B_HotFix3 =
    [h2 [] [text "ネクロマンサー 1.122B Hot Fix #3"],
     text "レベル50の Deathsight の能力 Bringer of Death の持続時間は30秒から20秒に短縮される。",
     br [] [],
     text "Chthonic Form のヒットポイントとAFの増加は Spear of King などのHP/AF増加効果と再びスタックするようになる。",
     br [] [],
     text "Chthonic Form の AF バフはレベル50以下では効果が低下する。",
     ulist ["レベル 20-34 では 25 AF",
            "レベル 35-44 では 75 AF",
            "レベル 45-49 では 125 AF",
            "レベル 50 では 250 AF (以前と同じ)"],
     text "plated fiend ペットの物理防御は減少する。"]


patch_1_122B_HotFix4 : List (Html Message)
patch_1_122B_HotFix4 =
    [h2 [] [text "ネクロマンサー 1.122B Hot Fix #4"],
     text "Plated Fiend ペットの移動速度がやや低下する。",
     secalb "Painworking (スペック)",
     text "背後スタイル Frozen Edge のデバフ量は45%から35%に減少する。",
     br [] [],
     text "スタイル Deathseeker のダメージは 100/tick から 75/tick に減少する。頻度は2秒ごとから2.5秒ごとになる。持続時間10秒は変わらない。",
     br [] [],
     text "レベル37 DoT Freezing Clench のダメージは 74/tick から 64/tick に減少する。",
     br [] [],
     text "レベル47 Dot Freezing Howl のダメージは 132/tick から 112/tick に減少する。",
     br [] [],
     text "Netherbane の DoT proc のダメージは 185/tick から 145/tick に減少する。頻度は2秒ごとから2.5秒ごとになる。持続時間10秒は変わらない。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix
      ++ patch_1_122B_HotFix2
      ++ patch_1_122B_HotFix3
      ++ patch_1_122B_HotFix4
