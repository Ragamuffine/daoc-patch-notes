module Skald exposing (..)

import Html exposing (..)
import Message exposing (Message)
import Style exposing (..)


patch_1_121 : List (Html Message)
patch_1_121 =
    [h2 [] [text "スカルド 1.121"],
     text "スカルドはフルリスペックされる。",
     text "スカルドはレルムアビリティーをリスペックされる。",
     text "レルムアビリティー Determination を選択可能になる。",
     secmid "Battlesongs (スペック)",
     text "自己バフ Root Dampening は除去される。",
     br [] [],
     text "resist song は30分継続のバフになる。CL resist およびシャーマン、ヒーラーのレジストとスタックしない。",
     ulist ["Level 27 - Soul Bolstering Chant - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 8% 増加",
            "Level 46 - Soul Bolstering Song - 4.0s cast - 1500 range - 持続時間20分 - 5% power - すべての魔法レジストを 12% 増加"],
     text "新しい speed buff を追加",
     ulist ["Crescendo, realm target, instant-cast, 再使用45秒, 7秒間継続, 130% speed buff, レベル35. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "Great Crescendo, realm target, instant-cast, 再使用45秒, 9秒間継続, 160% speed buff, レベル44. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。",
            "March of Bragi, group target, instant-cast, 再使用10分, 9秒間継続, 160% speed buff, レベル50. ターゲットは root, snare, mezz の影響を受ける。speedwarp で速度が落ちる。だが戦闘になっても speed buff は維持される。"],
     text "group fatigue reduction buff は pulse に戻る。",
     text "Moved Epiphany はレベル49になる。",
     br [] [],
     text "新しい PBAoE confuse spell が追加される。",
     ulist ["Level 27 - Disorienting Yelp - 20秒間継続 - 90s 再使用 - 500 半径 - 10% power cost",
            "Level 47 - Disorienting Cry - 20秒間継続 - 90s 再使用 - 750 半径 - 10% power cost"],
     text "新しいスペル Sleep and Stun Guard が追加される。",
     ulist ["Level 38 - Sleep Guard - Instant cast - realm-targeted - mezz を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない",
            "Level 48 - Stun Guard - Instant cast - realm-targeted - スタン(呪文)を一度だけブロックする - 1000 range - 再使用5分 - 自分には使用できない"],
     text "single-target DD は power pool の30%を回復するようになる。",
     text "speed song がランダムに落ちることがなくなる。",
     secmid "Axe (スペック)",
     ulist ["Level 15 - Evernight - Rear - ダメージ増加",
            "Level 29 - Havoc - Anytime - ダメージ減少",
            "Level 39 - Glacial Movement - Side - ダメージ増加",
            "Level 44 - Arctic Rfit - Evernight - ダメージ増加",
            "Level 50 - Tyr's Fury - Glacial Movement - ダメージやや増加"],
     secmid "Sword (スペック)",
     secmid "Hammer (スペック)",
     ulist ["Level 18 - Demolish - Frost Hammer - ダメージ増加",
            "Level 29 - Conquer - Rear - ダメージ増加",
            "Level 32 - Comminute - Anytime - ダメージ減少",
            "Level 44 - Sledgehammer - Conquer - ダメージ増加"],
     ulist ["Level 15 - Aurora - Northern Lights - ダメージやや増加",
            "Level 34 - Polar Rift - Anytime - ダメージ減少",
            "Level 50 - Ragnarok - Rear - ダメージ増加"]]


patch_1_122B : List (Html Message)
patch_1_122B =
    [h2 [] [text "スカルド 1.122B"],
     text "スカルドはフルリスペックされる。",
     secmid "Battlesongs (スペック)",
     text "新しく siege ダメージ吸収オーラが追加される。",
     ulist ["Level 6 - Rhythm of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 10% 低減",
            "Level 16 - Accent of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 20% 低減",
            "Level 26 - Intonation of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 30% 低減",
            "Level 36 - Pulse of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 40% 低減",
            "Level 46 - Count of the Siege - Instant cast - 1500 range - 持続時間8秒 - 7秒ごと - siege damage 50% 低減。同時に以下の効果を発動 - 500 range - 持続時間8秒 - 7秒ごと - 35% siege haste"],
     text "新しく siege へのグループダメージボーナスが追加される。",
     ulist ["Level 40 - Siegebreaker - Instant cast - 2000 range - 半径150 - 持続時間15秒 - 再使用90秒 - ターゲットの物理攻撃に 20 essence damage が追加される。ターゲットが扱う siege 武器のダメージにも同様に追加される。"]]


patch_1_122B_HotFix2 : List (Html Message)
patch_1_122B_HotFix2 =
    [h2 [] [text "スカルド 1.122B Hot Fix #2"],
     text "シージチャントは正しくグループメンバーに効果を及ぼすようになる。"]


patch_1_123 : List (Html Message)
patch_1_123 =
    [h2 [] [text "スカルド 1.123"],
     text "スカルドはフルリスペックされる。",
     secmid "Sword (スペック)",
     text "レベル29スタイル Rush のダメージがやや増加する。",
     secmid "Hammer (スペック)",
     ulist ["Level 48 - Grand Finale - Follows Frost Hammer - High Endurance - Very High Damage - High Hit Bonus - Medium Defensive Penalty - 距離1500内にいるグループメンバーの物理攻撃クリティカル率を25%増加させる。5秒間グループメンバーが受けたダメージの75%を攻撃者に反射する。この能力は duration 増加ボーナスの影響を受けない。"],
     secmid "Battlesongs (スペック)",
     text "スカルドが維持できるソングの数は12に増加する。",
     br [] [],
     text "スピードソングはすべてベースラインに移される。",
     ulist ["Level 3 - Simple Song of Travel",
            "Level 13 - Song of Travel",
            "Level 23 - Harmonic Song of Travel",
            "Level 33 - Magnificent Song of Travel",
            "Level 43 - Heavenly Song of Travel"],
     text "水バフはベースラインに移される。",
     text "endo 消費緩和ソングとパワー回復ソングは統合される。",
     text "ヘルス回復ソングと ablative ソングは統合される。",
     br [] [],
     text "Crescendo はグループを対象としたチャントになる。",
     ulist ["Level 35 - Crescendo - Instant cast - 1500 range - 5秒継続 - 4秒ごと - 再使用6秒 - 25% power - 戦闘中の移動速度を10%増加させる。スピードワープの影響を受ける。",
            "Level 44 - Great Crescendo - Instant cast - 1500 range - 5秒継続 - 4秒ごと - 再使用6秒 - 25% power - 戦闘中の移動速度を25%増加させる。スピードワープの影響を受ける。"],
     text "グループメンバーのヘルスと armor factor を増加させるチャントが新しく追加される。",
     ulist ["Level 3 - Song of Ivar - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを1%増加",
            "Level 13 - Song of Bjorn - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを3%増加",
            "Level 23 - Song of Harald - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを5%増加",
            "Level 33 - Song of Eirik - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを7%増加",
            "Level 43 - Song of Ragnar - Instant cast - 6秒継続 - 6秒ごと - 再使用5秒 - 1500 range - 10% power - ヘルスとAFを10%増加"],
     text "March of Bragi はスピードワープを無視するようになる。",
     text "Disorienting Cry の再使用時間は60秒に短縮される。",
     text "Chant of Blood はレベル44に移動する。",
     text "Battle Howl はレベル46に移動する。",
     text "War Howl はレベル47に移動する。"]


patch_1_124 : List (Html Message)
patch_1_124 =
    [h2 [] [text "スカルド 1.124"],
     ulist ["Level 35 - Crescendo - 移動速度ボーナスは115%から105%に減少する。",
            "Level 44 - Great Crescendo - 移動速度ボーナスは125%から115%に減少する。"]]


patch_1_124B : List (Html Message)
patch_1_124B =
    [h2 [] [text "スカルド 1.124B"],
     text "March of Bragi はスピードワープを無視しないようになる。"]


all : List (Html Message)
all = patch_1_121 ++ patch_1_122B ++ patch_1_122B_HotFix2
      ++ patch_1_123
      ++ patch_1_124
      ++ patch_1_124B
