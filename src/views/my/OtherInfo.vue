<template>
	<div class="other-info">
		<nav-bar :title="title" border></nav-bar>
		<!-- 关于我们 -->
		<div v-if="typeId == 6 && platformId != 3" class="other-about">
			<h3 class="other-about__title">Who is Plushe?</h3>
			<p class="other-about__text">
				Plushe is an international fashion brand that focuses on plus-size women's apparel, accessories and other fashion items. We are passionately dedicated to helping every woman, especially those with curves, create the life and possibilities she wants and deserves.
			</p>
			<p class="other-about__text">
				We pride ourselves on offering our exclusive up-to-date styles catering to those seeking the finest value. Because we believe that every curvy woman belongs to the world of fashion just like everybody else, we are deeply inspired to refine and create fashion that truly fits you. Our
				hope is that when you discover Plushe, you know a better way to treat yourself preciously.
			</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjM3NjQ3Mjg2LzIwMjEwNzIzMTAyMTMyMDc5LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<h3 class="other-about__title">Creative Team</h3>
			<p class="other-about__text">
				Plushe proudly presents our strong creative team that always stays on top of the latest global fashion trends. Kai Yeung Yau, Creative Director and one of the founders of Plushe, puts forward the design concept of "Dissect Yourself. Deconstruct the World", and always believes that
				beauty is something that everyone is born with. He is dedicated to discovering the expression of women's natural beauty and emphasizing it with self-confidence.
			</p>
			<p class="other-about__text">
				After graduating from London College of Fashion in Womenswear, Kai became an emerging designer with unique insights into design ideas and refined sensibility. He aims to add an optimistic core to Plushe's clothing and is positively conscious of quality, fit and attitude. To help
				everyone find their own beauty is the original intention of Kai and his team for designing clothing for every curvy girl.
			</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjc0ODc0MzkxLzIwMjEwNzIzMTAyMTMyMDc3LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<p class="other-about__text">
				Quality is about Time. Before the launch of Plushe, our design team has spent almost a year researching the supplier chain worldwide and finally found our fantastic quality clothing made in China. We reached over 2000 manufacturers within 6 months, then shortlisted under 40 to
				guarantee every piece of clothing can meet our fashion belief in quality and taste. We create a simple principle of fashion duration in order to calculate a longer lifespan of clothing, as quality doesn't only mean the luxury value, but also the balance of life.
			</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjg4NjIzMzA1LzIwMjEwNzIzMTAyMTMyMDU2LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<h3 class="other-about__title">Visual Team</h3>
			<p class="other-about__text">
				"To achieve the ultimate in every picture" - Creativity and texture are the directions pursued by Plushe's visual team. From shooting schedule planning to product presentation, the team is inspired by the combination of fashion and business. Our international photography team is
				equipped with the world's top lighting kits. The team is constantly expanding their horizons for elevation in their artworks.
			</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjk4MjQ1NjA0LzIwMjEwNzIzMTAyMTMyMDIxLnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<p class="other-about__text">Our Visual Director Titt is a professional photographer from France. He graduated from l'Institut international de l'image et du son (3iS Paris), the biggest audio-visual campus in Europe.</p>
			<p class="other-about__text">
				Traveling back and forth between Paris and New York, he regularly shoots fashion blockbusters for the "Big Four". His works have been published in Vogue, GQ, and other fashion magazines. Titt has photographed in more than 50 countries. In addition to fashion, he also took portraits
				of traditional handicraft producers in Africa and South America, actively devoted himself to photographing social activities related to environmental protection, and retained humanistic care in his works. "Telling stories with pictures" is his way of showing respect for photography
				and visual presentation.
			</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjc2NTM1ODcwLzIwMjEwNzIzMTAyMTMyMDI4LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
			<h3 class="other-about__title">Our Audience</h3>
			<p class="other-about__text">
				We adhere to the belief that "every curvy woman deserves better". Our customers are midsize and plus size women from around the world that share a love for fashion and are confident of their own worth. They wear different styles and have different body types, but we all believe that
				beauty is not limited by numbers. Every woman is unique, and wearing the clothes that reflect their personality, everyone can shine with confidence!
			</p>
			<p class="other-about__text">Plushe has made its way to most consumer markets in the world including North America, South America, Europe, etc,. We are humble to serve our customers and sincerely hope to hear more of your voice.</p>
			<img class="other-about__img" src="https://img.plushe.com/eyJidWNrZXQiOiJwcm8tcGx1c2hlIiwia2V5IjoicHJvZHVjdC8yMDIxMDcyMzEwMjEzMjYzNjI0NjQ2LzIwMjEwNzIzMTAyMTMyMDI5LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciJ9fX0=" alt="" />
		</div>
		<div v-if="typeId == 6 && platformId == 3" class="other-info__box">
			<p class="other-info__text">bondotはファッションアイテムに焦点を当てた国際的なファッションブランドです。 私たちは、すべての女性の望みを叶えて、ふさわしい人生と可能性を創造するのを助けることに熱心に取り組んでいます。</p>
			<p class="other-info__text">
				私たちは、最高の価値を求める人々に応えるために、最新的、優れたデザインを提供する。すべて女性がファッションの世界に属していると信じているため、あなたに似合うファッションアイテムをもっと洗練させます。体型カバーもしたいけれど、大人の女性らしいトレンド感のある着こなしも重視したい。是非bondotをチェックしてみてください。
			</p>

			<p class="other-info__text">
				bondotは流行の最先端を基づいて、流行や市場の傾向調査、製品企画の立案から、実際の製品化まで、地道な作業の積み重ねを行って、自らデザインした服を作り出していく。女性らしい可愛らしさや、細部にまで散りばめられた旬なスタイルを楽しみたい、品質も求めたい方は、bondotをチェックしてみましょう。
			</p>
			<p class="other-info__text">bondotは、日本人の消費者に向けて日本市場へ参入し日本人のお客様へ創造的適応しています。</p>
			<p class="other-info__text">当社は、お客様からいただいた声を真摯に受け止め、これからのサービス向上に取り入れていきたいと考えています。皆様からのご意見・ご要望をお待ちしております。</p>
		</div>

		<div v-if="typeId == 1 && platformId == 3" class="other-info__box">
			<p><strong>出荷と配達</strong></p>
			<p class="other-info__text">お客様はアイテムを早く受け取りたい気持ちを承知しております。 そのため、注文された商品が出来る限り早く届けるように努力をしています。 配達時間は配送先、商品の在庫状況、休日、入金順によって異なります。</p>
			<p class="other-info__text">１、通常的には、土日、祝日を除き出荷準備が3日間～8日間、商品がお手元に届くまでおおよそ10日間から2週間程度かかります。より多くのアイテムを含む注文は、追加時間がかかる可能性があり、別送料なしで二回分けて発送される場合があります。</p>
			<p class="other-info__text">２、一部の商品は海外から発送のため、天候や通関状況よっては遅延が発生する場合もございます。</p>
			<p class="other-info__text">３、追跡番号で商品の配送状況や配達業者の連絡先をご確認いただけます。</p>
			<p><strong>発送確認</strong></p>
			<p class="other-info__text">
				ご注文の商品が発送されると、発送確認メールが送信され、ご注文の商品が倉庫を出たことをお知らせします。 発送に含まれるアイテムの詳細と追跡番号がメールに記載されています。
				商品を追跡するには、提供されているリンクをクリックするだけですが、配送会社が配送状況を更新するのに時間かかる場合がありますので、追跡リンクのほうが時間が経ってから検索してください。
			</p>
			<p><strong>運送</strong></p>
			<p class="other-info__text">以下の配送オプションを提供しています。 配送時間は、配送先と選択した配送方法によって異なります。 発送予定日は、注文日ではなく、発送日から始まります。 通関手続き、住所の無効、その他の理由により、予想よりも時間がかかる場合があります。</p>
			<p class="other-info__text">【経済性速達国際便】※{{ $store.state.app.freeShipping }}円以上送料無料！</p>
			<p class="other-info__text">※送料：￥{{ $store.state.app.freeShipping }}</p>
			<p class="other-info__text">※配送サービスの提供元（日本到着後）： 【佐川急便】</p>
		</div>

		<div v-if="typeId == 5 && platformId == 3" class="other-info__box">
			<p><strong>規約変更について</strong></p>
			<p class="other-info__text">
				本規約は、当社及び本サービスの利用者全てに適用するものとし、利用者は本規約に同意の上、これを誠実に遵守するものとします。当社は、変更の内容が本規約に係る取引の目的に反せず、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らし、合理的なものであるとき、利用者の事前の承諾なしに、本規約を次項に定める方法により変更できるものとします。
			</p>
			<p><strong>免責事項</strong></p>
			<p class="other-info__text">①当社は、本サービス内容及びコンテンツの利用・使用により発生した損害、並びに、コンテンツ自体の有効性、正確性、適法性（ライセンスの有無を含む）、安全性、最新性及び完全性について、一切責任を負わないものとします。</p>
			<p class="other-info__text">②当社は、本サービスにおいて、利用者と第三者との間で生じたトラブル（本規約及び法令に違反する行為、公序良俗に反する行為、誹謗、中傷、名誉を毀損する行為、プライバシー侵害、脅迫、いやがらせ等及びそれらの行為の提案）に関して、一切責任を負わないものとします。</p>
			<p class="other-info__text">③当社は、本サービスの利用又は本サービスを通じた第三者のWebサイトの利用により、利用者が使用するコンピュータ、回線、ソフトウェア等に生じた損害について、一切責任を負わないものとします。</p>
			<p class="other-info__text">④当社は、当社の責めに帰すべき事由がある場合を除き、本サービスに関する遅滞、変更、停止、中止及び廃止、並びに、本サービスを通じて提供されるコンテンツの消失について、一切責任を負わないものとします。</p>
			<p><strong>著作権、商標権及びその他の知的所有権</strong></p>
			<p class="other-info__text">
				本サービスによって提供される写真、イラストなど文字・画像等のあらゆる情報（以下「コンテンツ」といいます）の著作権又はその他の知的所有権は当社及びコンテンツ提供者などの正当な権利者に帰属します。前項に記載する知的所有権者の事前の承認なく、コンテンツの一部又は全部をいかなる方法、いかなる形式によっても複製、転載、改変、その他の二次利用をすることを禁じます。
			</p>
			<p><strong>製品、内容、サイズについて</strong></p>
			<p class="other-info__text">
				このWebサイトで説明されているすべての機能、コンテンツ、仕様、製品、および価格は、予告なしにいつでも変更される場合があります。当社は、適切な色を含め、製品の属性を正確に表示するためにあらゆる合理的な努力をします。ただし、実際に表示される色はコンピュータシステムによって異なり、コンピュータがそのような色を正確に表示することを保証することはできません。特定の時点でこのWebサイトに製品またはサービスが含まれていることは、これらの製品またはサービスが利用可能というわけではないです。このWebサイトから購入したアイテムの所有、使用、および販売に関して、すべての現地法、州法、および国際法に適応し、遵守することはお客様の責任です。お客様は注文することにより、合法的な方法で使用されることを表明したことになります。
			</p>
			<p><strong>配送について</strong></p>
			<p class="other-info__text">
				ご注文の際は、購入者が指定した配送先住所が、このウェブサイトに記載されている配送制限に準拠している場合に限り、購入者が指定した住所に配送されます。 このWebサイトからの購入は、出荷契約に従って行われます。商品の紛失のリスクと所有権は、商品が配送業者に配達された時点でお客様に移転します。
				お客様は配送業者に破損または紛失のクレームを提出することができます。
			</p>
			<p><strong>関税と税金</strong></p>
			<p class="other-info__text">お客様は関税と税金に対して責任があります。 外国に入国する商品は、その国の国内法に従って税関検査および関税の評価の対象となります。</p>
			<p><strong>ID及びパスワードの管理</strong></p>
			<p class="other-info__text">
				会員登録時に発行されたネット会員ＩＤとパスワードの使用・管理に関しては、その会員が全ての責任を負うものとします。ネット会員ＩＤの使用上の過失や、第三者がネット会員ＩＤとパスワードを利用し発生した問題について、当社は一切の責任を負わないものとします。このWebサイトおよび
				bondotは、サービスの拒否、アカウントの終了、コンテンツの削除または編集、または注文のキャンセルを行う権利を留保します。
			</p>
			<p class="other-info__text">注文することにより、あなたは18 歳以上であること、およびwww.bondot.com に正確で真実の情報を提供していること、および注文する権限があることを保証するものとします。</p>
			<p><strong>電子メール</strong></p>
			<p class="other-info__text">
				このWebサイトにアクセスしたり、当社に電子メールを送信したりすると、当社からの受信することに同意したことになります。お客様の同意に基づき、または法令で許容されている範囲および手段で、お客様にダイレクトメール、メールマガジン等の広告を送付または表示する可能性があります。
			</p>
			<p><strong>保証の除外</strong></p>
			<p class="other-info__text">
				bondotは、このWebサイトの正常的に使用または使用への適合性、使用中断されない、エラーがないことについて、保証を行いません。このウェブサイトは明示または黙示を問わず現状のままお客様に製品を提供されます。だたし、すべての情報または資料、品質、耐久性、非侵害の保証などを含むこのを限定されない。
			</p>
			<p><strong>準拠法</strong></p>
			<p class="other-info__text">これらの利用規約および当社がお客様に提供する個別の契約は、日本の法律に準拠し、これに従って解釈されるものとします。</p>
		</div>

		<div v-if="(typeId == 7 || typeId == 12) && platformId == 3" class="other-info__box">
			<div class="connect-us">
				<h2>弊社にメールを送り</h2>
				<p>
					<label class="email_label">Email: </label>
					<span class="email">{{ platformEmail }}</span>
					<span class="copy" v-copy :data-clipboard-text="platformEmail">copy</span>
				</p>
				<!-- <van-row type="flex" justify="center">
					<img class="other-icons-img" :src="item.icon" alt="" v-for="item of iconList" :key="item.name" @click="goto(item.url)" />
				</van-row> -->
			</div>

			<div v-if="typeId == 12" class="find-answer" @click="$router.push({ path: '/otherInfo?id=7' })">
				<h2>最適な答えを見つける</h2>
				<van-row type="flex" justify="center">
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-1.png" alt="" />
						</div>
						<p>注文について</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-2.png" alt="" />
						</div>
						<p>支払いについて</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-3.png" alt="" />
						</div>
						<p>返品と返金に関する</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-4.png" alt="" />
						</div>
						<p>出荷と配達について</p>
					</div>
				</van-row>
			</div>
			<div v-if="typeId == 7" style="margin-top: 20px">
				<p><strong>1 注文方法</strong></p>
				<p class="other-info__text">[今すぐ購入] をクリックして直接チェックアウトするか、またはいくつかのアイテムを [カートに追加] して購入します。</p>
				<p><strong>2 お支払い方法</strong></p>
				<p class="other-info__text">クレジットカード、デビットカード、およびPayPalによる支払いを受け付けています。</p>
				<p><strong>3 返品は受け付けますか？</strong></p>
				<p class="other-info__text">
					はい、新品の状態でほとんどの商品 (ボディスーツ、ランジェリー、水着、ジュエリーを除く) については、受領後30日以内であれば返品を受け付けます。アイテムは未使用で、元のパッケージに入っている必要があります。返品と交換のポリシーについて詳しくは、返品ポリシーをご覧ください。
				</p>
				<p class="other-info__text">カスタマーサービスに直接連絡して、返品申請書または問い合わせを送信できます。お問い合わせ</p>
				<p><strong>4 サイズの選び方は</strong></p>
				<p class="other-info__text">各商品のサイズ情報は、各商品の最後の写真にあります。サイズガイド詳細はこちら: サイズガイド</p>
				<p><strong>5 配送時間</strong></p>
				<p class="other-info__text">配送には、お住まいの地域と配送の種類によって、約7～19営業日かかります。詳細はこちら: 配送情報</p>
				<p><strong>6 送料無料の条件は？</strong></p>
				<p class="other-info__text">ご注文金額が￥****を超えると、送料無料になります。</p>
				<p><strong>7 割引やセールはありますか?</strong></p>
				<p class="other-info__text">はい。送料無料、割引、セールなど、さまざまな特典をご用意しています。すべての取引について最新情報を入手するには、ページの下部にあるニュースレターを購読してください: 割引とセール</p>
				<p><strong>8 注文するにはアカウントを作成する必要がありますか?</strong></p>
				<p class="other-info__text">直接チェックアウトでき、出荷情報を保存して将来の使用に備えることができます。新しいオファーやご注文の詳細に関する情報を受け取るには、こちらからご登録ください: ログイン</p>
			</div>
		</div>
		<div v-else-if="typeId == 3 && platformId == 3" class="other-info__box">
			<p><strong>商品ごとにサイズが異なるため、サイズを決定する前に各商品の最後の写真（サイズ情報）をご確認ください。</strong></p>
			<p class="other-info__text">このサイズ表は参考用です。ブランドによってサイズ感が異なりますのでご注意ください。</p>

			<img src="https://cdn.shopifycdn.net/s/files/1/0518/0447/1450/files/1_dd2a0533-0e8a-4aae-9eac-8cc02ac37aa8_160x160.png?v=1608774798" alt="" style="display: block; margin-left: auto; margin-right: auto" />
			<p><strong>1.バスト</strong></p>
			<p class="other-info__text">胸ふくらみの最も高いところを水平に一周測ります。</p>
			<p><strong>2.ウエスト</strong></p>
			<p class="other-info__text">腰回りの一番細いところを水平に一周測ります。</p>
			<p><strong>3.ヒップ</strong></p>
			<p class="other-info__text">ヒップの最もふくらみのある部分を水平に一周測ります。</p>

			<img src="https://cdn.shopifycdn.net/s/files/1/0518/0447/1450/files/2_50b15acb-fecb-4560-bbf2-72d0b9770451_240x240.png?v=1608774839" alt="" style="display: block; margin-left: auto; margin-right: auto" />
			<p><strong>1.バスト</strong></p>
			<p class="other-info__text">胸ふくらみの最も高いところを水平に一周測ります。</p>
			<p><strong>2.ウエスト</strong></p>
			<p class="other-info__text">腰回りの一番細いところを水平に一周測ります。</p>
			<p><strong>3.ヒップ</strong></p>
			<p class="other-info__text">ヒップの最もふくらみのある部分を水平に一周測ります。</p>
		</div>
		<div v-else-if="typeId == 2 && platformId == 3" class="other-info__box">
			<p class="other-info__text">bondot通販サイトでご注文商品の返品・交換はご説明させて頂きます。商品のキャンセ</p>
			<p class="other-info__text">
				ルは商品が発送する前か、配達された後返品することか、どちらかできます。お客様の商品はまだ発送途中のことで、キャンセルことが出来ません。ご了承ください。
				bondotはお客様に最高のショッピング体験を提供するため全力を尽くします。商品がお手元に届きましたら、商品に不具合が無いかご確認ください。万が一欠陥、不良、違う商品が届いた、配送中の事故で商品が壊れたなどの原因で返品、交換希望の場合、必ず商品到着後7営業日以内にメール（support@bondot.com）/メッセージボックスにてご連絡ください。７営業日以降のお問合せはお受付致しませんので、あらかじめご了承ください。
			</p>
			<p><strong>一、不良品の内容</strong></p>
			<p class="other-info__text">下記の場合、不良品ではない旨をご案内をさせていただいておりますため、返品・交換はお受けしておりません。お求めやすい価格にてご提供させていただいておりますため、ご理解の程、よろしくお願いいたします。</p>

			<p class="other-info__text">1）糸のほつれについて（商品の糸のほつれにつきましては、ほつれを引っ張ると穴があくなどのものでない場合、商品自体に問題はございませんため、ハサミでほつれを切っていただきそのままご使用をお願いしております。）</p>
			<p class="other-info__text">2）縫製不良について（大量生産の商品となりますため、商品着用時に困難ではない場合、商品自体に問題はございませんため、そのままご使用をお願いしております。）</p>
			<p class="other-info__text">3）ボタンホールについて（商品のボタンホールについて、中国製のボタンホールの穴が塞いているので、お客様はボタンホールの裏側に残りの糸を通して切ってください。ご了承ください。）</p>
			<p class="other-info__text">4）素材について（毛がでる、においがするなど、商品の特性上、商品自体に問題がない場合、不良品ではございませんため、そのままご使用をお願いしております。）</p>
			<p class="other-info__text">
				5）色合いが異なる（商品の色合いは、写真撮影・パソコン画面表示等の環境の違いにより色みに差異が生じる場合がございます。予めご了承くださいませ。「思っていたイメージと違う」「色がモニタと違う」などの理由による商品の交換及び返品は、基本的にお受けすることが出来ません。）
			</p>
			<p class="other-info__text">6）シワ、汚れについて（遠距離の配送で、大量なパッケージは互いに押し出されたりする事はありますので、シワや汚れはつきます。商品自体に問題がない場合、アイロンや洗濯すれば、綺麗になりますため、そのままご使用をお願いしております。）</p>
			<p class="other-info__text">以上。恐れ入りますがご了承いただきますよう、お願いいたします。</p>

			<p><strong>二、返品不可の商品</strong></p>
			<p class="other-info__text">※以下の場合、不具合商品でも返金、交換はお受付できません。</p>
			<p class="other-info__text">・商品到着後7営業日以上経過した商品</p>
			<p class="other-info__text">・着用後の商品</p>
			<p class="other-info__text">・タグを取り外されたもの</p>
			<p class="other-info__text">・お客様で洗濯・クリーニング・裾直し・修理等をされたもの</p>
			<p class="other-info__text">・商品到着後のシワ・汚れ・匂いがついたもの</p>
			<p class="other-info__text">・付属品等のセット内容の一部がない商品</p>
			<p class="other-info__text">※良品の場合、未使用商品でも返品がお受付できない商品</p>
			<p class="other-info__text">・ウェディングドレス、ドレス</p>
			<p class="other-info__text">・ランジェリー下着、水着</p>
			<p class="other-info__text">※お客様都合による返品、交換できない</p>
			<p class="other-info__text">・お客様の原因で間違ったサイズを選択した場合返品はお受付いたしません。</p>
			<p class="other-info__text">・イメージと違うなどのお客様都合による返品はお受付いたしません。</p>
			<p class="other-info__text">・品質等の問題もなく、お気に入らずだけで返品希望がある方には、対応しかねる権利を持っています。</p>
			<p class="other-info__text">・写真提供、問題点説明などしない方には、対応しかねる権利を持っています。</p>
			<p class="other-info__text">・メールでのご連絡をいただけない場合、ご返品を受けいたしかねる場合がございます。</p>
			<p class="other-info__text">また、ご連絡がないまま弊社に返品いただいても、ご返金できない場合がございます</p>

			<p><strong>三、返品・交換の手続き</strong></p>
			<p class="other-info__text">返品・交換手続きについて、以下の内容をご参考ください。</p>
			<p class="other-info__text">①メール（support@bondot.com）もしくはマイページのメッセージボックスにてご連絡ください。</p>
			<p class="other-info__text">②ご注文情報、返品・交換を希望される理由と問題点をメールにご記入ください。（できるだけ詳しくご説明ください。）</p>
			<p class="other-info__text">※ご注文番号、返品・交換商品のサブ注文番号や商品番号、お電話番号などをご提供いただければ素早くご対応できます。あらかじめご理解ください。</p>
			<p class="other-info__text">③不良品の場合、返品商品の全体図と不備なところの画像（証拠写真）を添付ファイルでご提供ください。</p>
			<p class="other-info__text">※サイズが合わない場合、見える程度で採寸写真（採寸の数字が見える）をご提供ください。</p>
			<p class="other-info__text">④メールを確認後、2-3日営業日以内、弊社は対応致します。</p>
			<p class="other-info__text">⑤弊社は返品承認後、メールで返品フォームを送信致します。</p>
			<p class="other-info__text">※返品先は返品承認時、担当者よりご案内いたします。ご了承ください。</p>
			<p class="other-info__text">※返品時の配送方法によって、お届け時間は判断しかねますので、お客様ご自身より随時配送番号を持って配送情報をご確認ください。</p>
			<p class="other-info__text">※ご返品注意※</p>
			<p class="other-info__text">※bondot.com今では日本国内の返品住所はありません。返品について、カスタマサービスまでご連絡ください。</p>
			<p class="other-info__text">営業時間内に対応させて頂きます。定休日や営業時間外の対応は翌営業日になりますのでお待ちください。</p>

			<p><strong>四、返品・交換時の送料</strong></p>
			<p class="other-info__text">▲商品返送時の送料</p>
			<p class="other-info__text">商品の欠陥や不良など当社の原因による場合には、返品・交換をお受け付けます。</p>
			<p class="other-info__text">商品に欠陥がない場合は、返送の送料は購入者負担といたします。</p>
			<p class="other-info__text">その他の返送詳細は弊社の顧客問合せセンターにメールでお問い合わせください。ご迷惑をおかけして、申し訳ございません。</p>
			<p class="other-info__text">▲交換の送料</p>
			<p class="other-info__text">商品に欠陥がない場合は、交換の送料は購入者負担といたします。</p>
			<p class="other-info__text">初期不良または運送中の破損につきましては、商品の再送料金は弊社から負担となります。</p>
			<p class="other-info__text">※良品について、どうしてもご返品/交換希望な場合、往復送料をご負担いただくことになります。 あらかじめご了承ください。</p>

			<p><strong>五、長期不在・受取拒否・住所不明での返送</strong></p>
			<p class="other-info__text">長期不在・受取拒否･住所不明などでお荷物が返送された場合がございます。</p>
			<p class="other-info__text">商品のお届けをご希望の場合、メール（support@bondot.com）もしくはマイページのメッセージボックスにてカスタマーサービスまでご連絡ください。 この場合の再送料金は購入者負担といたします。</p>
			<p class="other-info__text">ご注文をキャンセル希望の場合、返金対応をいたします。この場合、一回目実際の送料を除いて返金となります。あらかじめご了承ください。</p>

			<p><strong>六、返金の手続き</strong></p>
			<p class="other-info__text">▲ご返品のご返金金額は、実際にお支払いいただきました金額となります。クーポン、割引にてご購入いただく場合、お値引後のお支払金額でのご返金となります。</p>
			<p class="other-info__text">▲ご返送商品が弊社に到着後、返送商品を確認後、一週間ぐらい（土日祝日を除く）でご返金の手続きが完了します。※返金手続きが処理完了後、弊社よりメールでご連絡させていただきます。</p>
			<p class="other-info__text">▲返金の手数料は弊社より負担といたします。</p>
			<p><strong>七、返金時間</strong></p>
			<p class="other-info__text">弊社より返金手続きを処理完了してから実際に返金されるまで、時間がかかる場合があります。また、お支払い方法に合わせて払い戻されます。</p>
			<p class="other-info__text">●クレジットカードでお支払いのお客様への返金</p>
			<p class="other-info__text">請求金額はクレジットカードに払い戻されます。弊社は4日以内返金の手続きを銀行の方に提出完了します。</p>
			<p class="other-info__text">返金の戻られる時間はカードの種類によって異なります。普通は1-3週間ぐらいかかりまして、あらかじめご了承ください。</p>
			<p class="other-info__text">※ただし、以上の返金時間より、時間がかかる場合がありますので、予めご了承くださいませ。</p>
			<p class="other-info__text">返品手順①②③に従い必要事項を記入してください。</p>
			<p class="other-info__text">手順① 返品される商品の項目（ご注文番号・商品番号・数量・理由コード）を紙に記入してください。</p>
			<p class="other-info__text">手順② 返品商品と一緒に交換・返品連絡紙を同封してください。</p>
			<p class="other-info__text">手順③ こちらに連絡後、ご返送ください。</p>
			<p class="other-info__text">ご注意：事前にご連絡なし、勝手に返品することをご遠慮ください。ご連絡なしの返品は返金処理しかねますので、予めご了承くださいませ。</p>
		</div>
		<div v-else-if="typeId == 4 && platformId == 3" class="other-info__box">
			<p class="other-info__text">弊社は、すべての女性を元気に、美しくするファッション通販会社として、質の高い商品やサービスを提供することにより、皆様の信頼にお応えすることをめざしております。</p>
			<p class="other-info__text">
				弊社は企業としての社会的責任を自覚し、事業活動の中でお預かりするお客様の個人情報（「（個人に関する情報であって、当該情報に含まれる氏名、生年月日その他記述により特定の個人を識別できるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものを含みます。）をいいます。）」）、お客様から取扱いを委託された個人情報および関係者の皆様の個人情報を保護し、法令及びその他の規範の遵守に努めることが、弊社の事業活動の基本であると考えております。
			</p>
			<p class="other-info__text">このため、弊社は業務に従事するスタッフ一人一人が個人情報保護の重要性を認識すると共に、個人情報の管理責任体制を構築し、お預かりする個人情報の適切な取扱いに努めてまいります。</p>
			<p class="other-info__text">お客様が当社をご利用して頂く際に、お客様の氏名、住所、電話番号、e-mailアドレスなどお取引やご連絡に必要な情報を開示していただきます。</p>
			<p class="other-info__text">弊社は、個人情報保護法の趣旨のもと、この個人情報保護方針に則って個人情報を取り扱います。このプライバシーポリシーは、弊社が開示いただいた個人情報の取扱いに関するお客様と弊社との約束です。</p>
			<p><strong>弊社は個人情報を以下の目的で利用させていただきます。</strong></p>
			<p class="other-info__text">1.お客様への商品の発送および代金の請求のためにお客様の氏名、住所、電話番号などの連絡先情報を利用します。また、代金の請求に関連してご指定いただいた銀行口座などのお支払情報に利用する場合があります。</p>
			<p class="other-info__text">2.ご注文の内容や配送方法などの連絡・確認するために、お客様の氏名、住所、e-mailアドレスなどの連絡先情報、ご注文いただいた商品の種類や数量、ご請求金額などの情報に利用いたします。</p>
			<p class="other-info__text">3.お客様に弊社が行うキャンペーンや商品・サービスのご案内をするために、ご利用された履歴や、お客様の氏名、住所、e-mailアドレスなどの連絡先情報に利用いたします。</p>
			<p class="other-info__text">4.弊社のサービス改善を行うために、お客様から寄せられたご意見、ご利用履歴などに利用いたします。</p>
			<p class="other-info__text">
				5.お客様からのご要望、お問い合わせに対する回答をするために、お客様の氏名、住所、e-mailアドレスなどの連絡先情報に利用いたします。
				不正な目的をもって商品を注文するような方にサービスのご利用をお断りするために、不正な目的での利用がなされたと判断したお取引に関するお客様の氏名、住所、ご注文いただいた商品の種類や数量、ご請求金額などの情報を弊社指定の信用情報機関に提供いたします。
			</p>
			<p><strong>個人情報の管理について弊社は以下の体制で個人情報を管理いたします。</strong></p>
			<p class="other-info__text">1.個人情報の利用を業務上必要な社員だけに制限し、個人情報が含まれる媒体などの保管・管理などに関する規則を作り、個人情報保護のための予防措置を講じます。</p>
			<p class="other-info__text">2.システムに保存されている個人情報については、業務上必要な社員だけが利用できるようアカウントとパスワードを用意し、アクセス権限管理を実施いたします。なお、アカウントとパスワードは漏えい、滅失のないよう厳重に管理いたします。</p>
			<p class="other-info__text">3.お客様の個人情報は会員登録時から退会時まで保管し、退会処理完了後、随時破棄して参ります。</p>
			<p class="other-info__text">4.取得した個人情報については、漏洩、紛失また破損の防止と是正、その他個人情報の安全管理のために必要かつ適切な措置を講じます。弊社の取り扱う個人情報を、名簿業者など第三者に対して貸与・売却する行為、またはこれに類する行為は一切いたしません。</p>
			<p class="other-info__text">5.個人情報の確認、変更、削除することができます。ご利用する時、support@bondot.comまでご連絡してください。</p>
			<p><strong>個人情報の開示について</strong></p>
			<p class="other-info__text">1.弊社は、お客様の同意がない限り、個人情報を第三者に開示することはございません。ただし、以下の事例に該当する場合はその限りではありません。個人情報の取扱いに関する法令、国が定める指針その他の規範を遵守いたします。</p>
			<p class="other-info__text">・法令に基づき裁判所や警察等の公的機関から要請があった場合</p>
			<p class="other-info__text">・法令に特別の規定がある場合</p>
			<p class="other-info__text">・お客様や第三者の生命・身体・財産を損なうおそれがあり、本人の同意を得ることができない場合</p>
			<p class="other-info__text">・法令や弊社のご利用規約・注意事項に反する行動から、当社の権利、財産またはサービスを保護または防御する必要があり、本人の同意を得ることができない場合</p>
			<p class="other-info__text">2.お客様から個人情報の開示要求があった場合は、本人であることが確認できた場合に限り開示いたします。</p>
			<p><strong>苦情及び相談への対応</strong></p>
			<p class="other-info__text">弊社は、個人情報の取扱いに関する苦情及び相談を受けた場合は、その内容について迅速に事実関係等を調査し、合理的な期間内に誠意をもって対応いたします。</p>
			<p><strong>クッキーの利用</strong></p>
			<p class="other-info__text">
				当サイトでは、クッキー(Cookie)やWebビーコンと呼ばれる技術を使用しています。
				クッキーとは、お客様側のパーソナルコンピュータ（以下PC）に一時的にデータを書き込んで保存させる機械文字のみの情報で、当サイトを訪れたとき、お客さまのPCのハードディスク上に置かれます。クッキー情報を参照することにより、弊社はお客様がご利用のPCを識別することができます。保存できるデータは、訪問者の訪問回数や、訪問者のブラウザ表示の好みなどです。サーバーコンピュータ側でもクッキーを使用することがありますが、これによってお客様の個人情報がサーバーに送信されることはございません。また、ブラウザの設定でクッキーの機能を無効にすることもできます。
			</p>
			<p class="other-info__text">
				クッキーには通常、送信元ドメインの名称と1つのデータが格納されています。クッキーの使用は業界の標準であり、ほとんどのサイトでカスタマーに有益な機能を提供する目的でクッキーが使用されています。
				Webビーコンは、お客様が訪問されたページの訪問回数を数えて統計データを作成するために使用されるもので、特定の個人を識別する機能を持っておりません。また、Webビーコンは、特定のページのアクセス状況を知るための技術です。
			</p>
			<p class="other-info__text">当サイトでは、下記のような時にクッキーを使用する場合があります。</p>
			<p class="other-info__text">・お客様ごとにカスタマイズしたサービスを提供するにあたり、利便性を考慮しクッキーを使用することがあります。</p>
			<p class="other-info__text">・本サイト内の情報の改善のため、利用者数を計測ためにクッキーを使用いたします。</p>
			<p class="other-info__text">・掲載広告についてもクッキーを使用いたします。</p>
			<p class="other-info__text">
				お客様のブラウザ設定を変更することで、クッキーの受け入れを拒否することもできます。また、フォルダに保存されているクッキーの情報を削除することもできます。（ただし、クッキーを無効化して削除すると、当サイトの機能の一部が使用できなくなることがあります。）ご利用のブラウザでクッキーを無効化して削除する方法がご不明な場合は、ご利用ブラウザのヘルプ機能で詳細をご確認ください。
			</p>
		</div>
		<!-- 政策协议 -->
		<div v-else-if="typeId == 4 && platformId != 3" class="other-info__box return-exchange">
			<h3 style="margin-top: 0">
				<strong><b>Plushe </b></strong><strong><b>PRIVACY POLICY</b></strong>
			</h3>
			<p>
				&nbsp;This Privacy Policy explains how Plushe&nbsp;(collectively, "Plushe," "our," "us," or "we") collect, use,share and process your information as well as you and our&nbsp;legal rights and responsibilities with respect to that information. This Privacy Policy applies to all
				personal information collected during any written, electronic, and oral communications or collected online or offline, which include: our website, located at PLUSHE.COM as well as any other written, electronic, and oral communications with Plushe and its representative parties
				(collectively, the "Services").&nbsp;Plushe&nbsp;takes very seriously its responsibility to protect the safety and security of your Personal Information that we process and is committed to respecting your privacy rights.
			</p>
			<h3>
				<strong><b>Personal Information That We Collect</b></strong>
			</h3>
			<p>
				<strong><b>We collect personal information when you </b></strong><strong><b>register or make a purchase on our website.</b></strong
				>&nbsp;Personal information generally is any information that relates to you, identifies you personally or could be used to identify you, such as your name, email address, phone number, and address. We may use this personal information to provide our products or services to
				you.&nbsp;
			</p>
			<p>
				<strong><b>We collect personal information when you send us message, email or call us.</b></strong
				>&nbsp;We may use this information to respond to you or reply you.
			</p>
			<p>
				<strong><b>We collect personal information when you subscribe. </b></strong>We collect your email address information when you subscribe Plushe NEWSLETTER to receive updates, access to exclusive deals, and more.
			</p>
			<p>
				<strong><b>General Uses.</b></strong
				>&nbsp;We’ll use your information to process the order. We may also use the&nbsp;Personal Information to optimize our service to you and send you information about our new products, promotion or discount that you may be interested in with your consent where necessary.
			</p>
			<p>
				<strong><b>Passively Collected Information.</b></strong
				>&nbsp;We use passively collected information to monitor&nbsp;and control&nbsp;the performance of our Sites, analyze trends, usage and activities in connection with our services, validate users and ensure their technological compatibility with users, and optimize our marketing
				efforts.
			</p>
			<p>
				<strong><b>Combination information</b></strong
				><strong><b>.</b></strong
				>&nbsp;We may&nbsp;combine the information we collect&nbsp;to create aggregate data which does not include any Personal Information and which cannot be used to identify you. Such as&nbsp;the general demographics, usage or other characteristics of a website's users. We reserve the
				legal right to transfer and/or sell aggregate or group data about a Site's users for lawful purposes.&nbsp;
			</p>
			<h3>
				<strong><b>2.Shopify</b></strong>
			</h3>
			<p>Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.</p>
			<p>Your data is stored through Shopify’s data storage, databases and the general Shopify application. They store your data on a secure server behind a firewall.</p>
			<h3>
				&nbsp;<strong><b>Payment:</b></strong>
			</h3>
			<p>
				If you choose a direct payment gateway to complete your purchase, then Shopify stores your credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your
				purchase transaction. After that is complete, your purchase transaction information is deleted.
			</p>
			<p>All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover.</p>
			<p>PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>
			<p>For more insight, you may also want to read Shopify’s Terms of Service (https://www.shopify.com/legal/terms) or Privacy Statement (https://www.shopify.com/legal/privacy).</p>
			<h3>
				<strong><b>3.The Third-Party Services</b></strong>
			</h3>
			<p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
			<p>However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
			<p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
			<p>
				These third parties do not have any independent right to share your Personal Information. We will exercise reasonable measures to have the third parties to whom we disclose your Personal Information respect your Personal Information and comply with applicable data protection
				laws.&nbsp;
			</p>
			<p>
				<strong><b>Links to Other Websites.</b></strong
				>&nbsp;When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices or the content of such websites. We suggest that you contact these third parties directly for information regarding their privacy, security and data
				collection and distribution policies prior to providing them with any information.
			</p>
			<p>
				<strong><b>Google analytics. </b></strong>To help facilitate the delivery of relevant content, we use Google Analytics and have implemented the following Google Advertising Features: Remarketing, Impression Reporting, and Demographics and Interest Reporting. We use Google Analytics
				cookies and other Google advertising cookies. You can opt out of the Google Analytics Advertising Features we use by indicating your preference using the interest-based opt-out link here. Google also provides a complete privacy policy, and instructions on opting out of Google
				Analytics here. Note that Google's opt-out mechanism is specific to Google activities and does not affect the activities of other ad networks or analytics providers that we may use.&nbsp;
			</p>
			<h3>
				<strong><b>4.Security</b></strong>
			</h3>
			<p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
			<p>
				If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS
				requirements and implement additional generally accepted industry standards.&nbsp;
			</p>
			<h3>
				<strong><b>5.Cookies</b></strong>
			</h3>
			<p>Our website will use cookies but&nbsp;you can choose if you want to opt-out of cookies or not.</p>
			<p>The way we use:</p>
			<p>&nbsp;- Instructions on how to opt out of receiving targeted advertising or may have Opt-out link.</p>
			<p>- The advertiser needs to include opt-out information or link in the privacy policy section in order to toggle privacy policy to yes.</p>
			<p>&nbsp;PREF, persistent for a very short period, Set by Google and tracks who visits the store and from where.</p>
			<h3>
				<strong><b>6.Changes to This Privacy Policy</b></strong>
			</h3>
			<p>
				Plushe&nbsp;may change this Privacy Policy from time to time to reflect our current practices. So please review it frequently. Any changes to this Privacy Policy will be updated&nbsp;on PLUSHE.COM&nbsp;and will be effective when posted unless another date is referenced in the notice.
			</p>
			<h3>
				<strong><b>Complaints and Contact Us</b></strong>
			</h3>
			<p>
				&nbsp;If you have any complaints concerning your personal information that Plushe collected, you want Plushe to delete your personal information or you just want to know more about our Privacy Policy. Please feel free to contact us at
				<span
					><a :href="`mailto:${platformEmail}`"
						><u>{{ platformEmail }}</u></a
					></span
				>
			</p>
		</div>

		<!-- 退款 -->
		<div v-else-if="typeId == 2 && platformId != 3" class="other-info__box return-exchange">
			<!-- <p style="color: #222">
				<strong><b>Return &amp; Exchange</b></strong>
			</p> -->
			<p>What You Need to Know for Return & Exchange</p>
			<p>1. We're bummed if you're not 100% satisfied with the items you received, and we gladly accept returns <span class="red">within 45 days after the purchase date</span>. No returns made after 45 days from the purchase date will be accepted.</p>
			<p>2. Shipping is free on your first return for any order. (See 'Return Procedure' section for details).</p>
			<p>3. After you have already returned items from an order but would like to make additional returns for additional items, you must do so within 45 days after the purchase date, and the additional shipping fee will be made at your own cost.</p>
			<h3>
				<strong><b>Return Procedure</b></strong>
			</h3>
			<p>1.Please contact Customer Service,indicating the item(s) you would like to return and the reason.</p>
			<p><span>2.After receiving return instructions from us, please package the item(s) securely with the original packaging .</span></p>
			<p>3.Drop off your package at the local post office.</p>
			<p><span>4.Most returns are processed within 5 business days after we receive your package. You will receive a confirmation email after your refund has been issued to your payment account.</span></p>
			<p>*Refund is calculated according to the actual amount paid, in the cases of discount code usage and sales.</p>
			<h3>
				<strong><b>Return Conditions</b></strong>
			</h3>
			<p>1. You have 45 days to decide if an item is right for you, if you would like to return or exchange the item please contact us within 30 days of delivery.</p>
			<p>2. The following items cannot be returned or exchanged: bodysuits, lingerie, swimwear, jewelry, underwear, event & party supplies, DIY supplies, pet supplies, beauty and accessories (except scarves, bags, and mermaid blankets).</p>
			<p>3. Returned items must be in their unused condition with the original packing. We do not accept a returned item that has been worn, damaged, washed, or altered in any way.</p>
			<p>4. Items with non-returnable marks and free gifts cannot be returned.</p>
			<p>5. We do not accept returned items that have been sent back without proper returns requests.</p>
			<p>6. We do not offer Freight To Collect (FTC) service for the packages returned to us. The returns will be made at your own cost.</p>
			<p>Note: The original shipping fee and Shipping Guarantee are non-refundable.</p>
			<h3>
				<strong><b>Return Address</b></strong>
			</h3>
			<p>Please contact our Customer Service, and you will receive a response as soon as possible.</p>
			<p><strong>Note: Please do not send your return to the address on your package. That is not our return address and will affect the processing of your return.</strong></p>
		</div>

		<!-- 团队 -->
		<div v-else-if="typeId == 5 && platformId != 3" class="other-info__box return-exchange">
			<h3 style="margin-top: 0">
				<strong><b>These Terms and Conditions May Change</b></strong>
			</h3>
			<p>
				We reserve the right to update or modify these terms and conditions at any time without prior notice. Your use of www.plushe.com following any such change constitutes your agreement to follow and be bound by the terms and conditions as changed. For this reason, we encourage you to
				review these terms and conditions whenever you use this website.
			</p>
			<h3>
				<strong><b>Limitations of Liability</b></strong>
			</h3>
			<p>
				Plushe shall not assume any responsibility, and shall not be liable for any damages or viruses that may infect your computer, telecommunication equipment, or other property caused by or arising from your access to, use of, or browsing this website or your downloading of any
				materials, from this website. In no event will Plushe nor their respective officers, directors, employees, shareholders, affiliates, agents, successors, assigns, retail partners nor any party involved in the creation, production or transmission of this website be liable to any party
				for any indirect, special, punitive, incidental or consequential damages (including, without limitation, those resulting from lost profits, lost data or business interruption) arising out of the use, inability to use, or the results of use of this website, any websites linked to this
				website, or the materials, information or services contained at any or all such sites, whether based on warranty, contract, tort or any other legal theory and whether or not advised of the possibility of such damages. The foregoing limitations of liability do not apply to the extent
				prohibited by law. Please refer to your local laws for any such prohibitions.
			</p>
			<p>
				In the event of any problem with this website or any content, you agree that your sole remedy is to cease using this website. In the event of any problem with the products or services that you have purchased on or through this website, you agree that your remedy, if any, is from the
				manufacturer of such products or supplier of such services, in accordance with such manufacturer’s or supplier’s warranty, or to seek a return and refund for such product or services in accordance with the returns and refunds policies posted on this website. This site may include
				inaccuracies, mistakes or typographical errors. It does not warrant that the content will be uninterrupted or error-free.
			</p>
			<h3>
				<strong><b>Copyright and Trademark</b></strong>
			</h3>
			<p>
				Unless otherwise indicated, the material on this website, including but not limited to texts, images, illustrations, software, audio clips, video clips, animation files, is subject to the copyright and trademark rights of Plushe. Consequently, the material on this website may not be
				copied, reproduced, modified, posted, transmitted, distributed, in whole or in part in any form whatsoever, without the prior written consent of Plushe. All rights reserved.
			</p>
			<h3>
				<strong><b>Products, Content and Specifications</b></strong>
			</h3>
			<p>
				All features, content, specifications, products and prices of products and services described or depicted on this website are subject to change at any time without notice. Certain weights, measures and similar descriptions are approximate and are provided for convenience purposes
				only. &nbsp;We make all reasonable efforts to accurately display the attributes of our products, including the applicable colors; however, the actual color you see will depend on your computer system, and we cannot guarantee that your computer will accurately display such colors. The
				inclusion of any products or services on this website at a particular time does not imply or warrant that these products or services will be available at any time. &nbsp;It is your responsibility to ascertain and obey all applicable local, state and international laws in regard to
				the possession, use and sale of any item purchased from this website. By placing an order, you represent that the products ordered will be used only in a lawful manner.
			</p>
			<h3>
				<strong><b>Shipping Limitations</b></strong>
			</h3>
			<p>
				When an order is placed, it will be shipped to an address designated by the purchaser as long as that shipping address is compliant with the shipping restrictions contained on this website. All purchases from this website are made pursuant to a shipment contract. As a result, risk of
				loss and title for items purchased from this website pass to you upon delivery of the items to the carrier. You are responsible for filing any claims with carriers for damaged and/or lost shipments.
			</p>
			<h3>
				<strong><b>Duties and Taxes</b></strong>
			</h3>
			<p>You are responsible for duties and taxes. All items entering a foreign country are subject to customs inspection and assessment of the duties and taxes in accordance with that country’s national laws.</p>
			<h3>
				<strong><b>Your Account</b></strong>
			</h3>
			<p>
				You are responsible for maintaining the confidentiality of your account and password information, and you agree to accept responsibility for all activities that occur under your account and password.&nbsp; This website and Plushe reserve the right to refuse service, terminate
				accounts, remove or edit content or cancel orders.
			</p>
			<p><span>By placing an order, you warrant that you are over 18 years old , and that you are providing www.plushe.com with accurate, truthful information and that you have the authority to place the order.</span></p>
			<h3>
				<strong><b>Exchange and Refund Policy </b></strong>
			</h3>
			<p><span>EXCHANGE AND REFUND POLICY</span></p>
			<p><span>Electronic Communications</span></p>
			<p>
				When you visit this website and/or send email to us, you consent to receive electronic communications from us. You agree that all agreements, notices, disclosures and other communications that we sent you electronically satisfy any legal requirement that such communications be in
				writing.
			</p>
			<p><span>Exclusions of Warranties</span></p>
			<p>
				Plushe makes no representation or warranty regarding the good working order or condition of this website, its suitability for use, or that its use will be uninterrupted or error-free. All information or material provided in this website to you AS IS and without warranties of any
				kind, expressed or implied, including without limitation, warranties or conditions of merchantability, fitness, quality, durability or suitability for any particular purpose, or non-infringement.
			</p>
			<p><strong>GOVERNING LAW</strong></p>
			<p><span>These Terms of Service and any separate agreements whereby we provide you shall be governed by and construed in accordance with the laws of the UK.</span></p>
		</div>

		<!-- size-guide -->
		<div v-else-if="typeId == 3 && platformId != 3" class="other-info__box size-guide">
			<h3 style="text-align: center"><b>How To Measure</b></h3>
			<p>
				<span style="color: #e81027"><strong>*Please check the size chart on the product page before you decide on your size. Note that sizing can vary between items.*</strong></span>
			</p>
			<!-- <p>This size chart is for reference purposes only. Note that sizing will vary between brands.</p> -->
			<div>
				<img src="@/assets/images/other-info/size_dx2x.png" alt="" style="width: 160px; height: auto" />
				<h5><b>1 Bust</b></h5>
				<p>Measure under your arms around the fullest part of your bust. Make sure to keep the tape level!</p>
				<h5><b>2 Waist</b></h5>
				<p>Make sure the measuring tape fits comfortably as you measure around the narrowest part of your natural waist.</p>
				<h5><b>3 Hips</b></h5>
				<p>Stand with your feet together, and measure around the widest part of your hips.</p>
			</div>
			<div>
				<img src="@/assets/images/other-info/size_qz2x.png" alt="" style="width: 180px; height: auto" />
				<h5><b>1 Bust</b></h5>
				<p>Measure under your arms around the fullest part of your bust. Make sure to keep the tape level!</p>
				<h5><b>2 Waist</b></h5>
				<p>Make sure the measuring tape fits comfortably as you measure around the narrowest part of your natural waist.</p>
				<h5><b>3 Hips</b></h5>
				<p>Stand with your feet together, and measure around the widest part of your hips.</p>
			</div>
			<div>
				<img src="@/assets/images/other-info/size_ck2x.png" alt="" style="width: 107px; height: auto" />
				<h5><b>1 Waist</b></h5>
				<p>Make sure the measuring tape fits comfortably as you measure around the narrowest part of your natural waist.</p>
				<h5><b>2 Hips</b></h5>
				<p>Stand with your feet together, and measure around the widest part of your hips.</p>
			</div>
		</div>

		<!-- shipping Information -->
		<div v-else-if="typeId == 1 && platformId != 3" class="other-info__box shipping-information">
			<p>Items require additional delivery time due to the challenges of COVID-19.</p>
			<p><span>Shipping from Global（1-3 business days for processing)</span></p>
			<p class="red">
				<strong style="font-weight: 600">Free Standard Shipping for orders over ${{ $store.state.app.freeShipping }}</strong>
			</p>
			<div class="TableWrapper">
				<div class="table">
					<ul class="table-tr table-head">
						<li><span>Options</span></li>
						<li><span>Shipping Time</span></li>
						<li><span>Cost</span></li>
					</ul>
					<ul class="table-tr table-body" v-for="item of shippingList" :key="item.id">
						<li>
							<span>{{ item.name }}</span>
						</li>
						<li>
							<span>{{ item.desc }}</span>
						</li>
						<li>
							<span>{{ filterPriceMethod(item.fee) }}</span>
						</li>
					</ul>
				</div>
			</div>
			<p style="text-align: left; color: #222" class="fontSize12">* Shipping time is estimated and commences from the date of shipping, and can take longer than expected due to invalid address, customs clearance or other causes.</p>
		</div>

		<!-- FQA -->
		<div v-else-if="(typeId == 7 || typeId == 12) && platformId != 3" class="other-info__box">
			<div class="connect-us">
				<h2>EMAIL US</h2>
				<p>
					<label class="email_label">Email: </label>
					<span class="email">{{ platformEmail }}</span>
					<span class="copy" v-copy :data-clipboard-text="platformEmail">copy</span>
				</p>
				<van-row type="flex" justify="center">
					<img class="other-icons-img" :src="item.icon" alt="" v-for="item of iconList" :key="item.name" @click="goto(item.url)" />
				</van-row>
			</div>
			<div v-if="typeId == 12" class="find-answer" @click="$router.push({ path: '/otherInfo?id=7' })">
				<h2>Find Your Answers</h2>
				<van-row type="flex" justify="center">
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-1.png" alt="" />
						</div>
						<p>Order Issues</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-2.png" alt="" />
						</div>
						<p>Payment</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-3.png" alt="" />
						</div>
						<p>Returns & Refunds</p>
					</div>
					<div class="find-answer-item">
						<div class="find-answer-cont">
							<img src="@/assets/images/other-info/support-4.png" alt="" />
						</div>
						<p>Shipping & Delivery</p>
					</div>
				</van-row>
			</div>
			<template v-if="typeId == 7">
				<div class="collapse_item">
					<h2>ACCOUNT</h2>
					<van-collapse v-model="collapse.account" accordion :border="false">
						<van-collapse-item title="How to order?">Click ‘Buy it now’ and proceed to checkout directly, Or ‘Add to cart’ a few items and then click ‘Checkout’.</van-collapse-item>
						<van-collapse-item title="Do I need to create an account to place an order?"
							>You can checkout directly, and your shipping information can be stored for the future use. To receive information on new offers and your order details, sign up here: <span class="link" @click="fqaGoPage('/login')">login</span>
						</van-collapse-item>
					</van-collapse>
				</div>
				<div class="collapse_item">
					<h2>SHIPPING</h2>
					<van-collapse v-model="collapse.shipping" accordion :border="false">
						<van-collapse-item title="Payment method"> We accept payments via credit and debit cards, and PayPal. </van-collapse-item>
						<!-- <van-collapse-item title="How to track my order?">
							缺少
						</van-collapse-item> -->
						<van-collapse-item title="How long does shipping take?">
							Shipping takes about 7 to 14 business days depending on your location and the type of shipping. More details here:
							<span class="link" @click="fqaGoPage('/otherInfo', { id: 1 })">shipping info</span>
						</van-collapse-item>
						<van-collapse-item title="Do you offer free shipping?"> You automatically get free shipping when your order exceeds ${{ $store.state.app.freeShipping }}. </van-collapse-item>
					</van-collapse>
				</div>
				<div class="collapse_item">
					<h2>PRODUCT</h2>
					<van-collapse v-model="collapse.product" accordion :border="false">
						<van-collapse-item title="Do you accept returns?">
							Yes, we gladly accept returns within 30 days of receipt for most items in new condition (except bodysuits, lingerie, swimwear, jewelry). The items must be unused and in original packaging. For more details on return & exchange policy, please visit:
							<span class="link" @click="fqaGoPage('/otherInfo', { id: 2 })">return & exchange</span><br />
							You can contact Customer service directly to submit your return application or inquiry:
							<span class="link" @click="fqaGoPage('/connectToUs')">connet to us</span>
						</van-collapse-item>
						<van-collapse-item title="How to choose my size?">
							The size info for each product can be found in the last picture of each product. You can find a detailed size guide here:
							<span class="link" @click="fqaGoPage('/otherInfo', { id: 3 })">size guide</span>
						</van-collapse-item>
						<van-collapse-item title="Do you have any discounts or sales？"> Yes, we provide various offers such as free shipping, discounts and sales. </van-collapse-item>
					</van-collapse>
				</div>
				<div class="collapse_item">
					<h2>OTHER</h2>
					<van-collapse v-model="collapse.other" accordion :border="false">
						<van-collapse-item title="Any question?">
							You can contact us through our contact page! We will be happy to assist you.
							<span class="link" @click="fqaGoPage('/connectToUs')">connet to us</span>
						</van-collapse-item>
					</van-collapse>
				</div>

				<!-- <h3>1 How to order?</h3>
			<p>Click ‘Buy it now’ and proceed to checkout directly, Or ‘Add to cart’ a few items and then click ‘Checkout’.</p>
			<h3>2 Payment method</h3>
			<p>We accept payments via credit and debit cards, and PayPal.</p>
			<h3>3 Do you accept returns?</h3>
			<p>
				Yes, we gladly accept returns within 30 days of receipt for most items in new condition (except bodysuits, lingerie, swimwear, jewelry). The items must be unused and in original packaging. For more details on return & exchange policy, please visit:
				<span class="link" @click="fqaGoPage('/otherInfo', { id: 2 })">refund-policy</span>
			</p>
			<p>You can contact Customer service directly to submit your return application or inquiry: <span class="link" @click="fqaGoPage('/connectToUs')">connect to us</span></p>
			<h3>4 How to choose my size?</h3>
			<p>The size info for each product can be found in the last picture of each product. You can find a detailed size guide here: <span class="link" @click="fqaGoPage('/otherInfo', { id: 3 })">size guide</span></p>
			<h3>5 How long does shipping take?</h3>
			<p>Shipping takes about 7 to 19 business days depending on your location and the type of shipping. More details here: <span class="link" @click="fqaGoPage('/otherInfo', { id: 1 })">shipping info</span></p>
			<h3>6 Do you offer free shipping?</h3>
			<p>You automatically get free shipping when your order exceeds $59.00.</p>
			<h3>7 Do you have any discounts or sales？</h3>
			<p>
				Yes, we provide various offers such as free shipping, discounts and sales.
			</p>
			<h3>8 Do I need to create an account to place an order?</h3>
			<p>You can checkout directly, and your shipping information can be stored for the future use. To receive information on new offers and your order details, sign up here: <span class="link" @click="fqaGoPage('/login')">login</span></p> -->
			</template>
		</div>

		<!-- paypal授权 -->
		<div v-else-if="typeId == 8">
			<div class="paypal">
				<h1>Plushe User Agreement ("Agreement")</h1>
				<p>Last updated: June 15, 2021</p>
				<p>Please read this Plushe User Agreement carefully before clicking the "I Agree" button, downloading or using Plushe.</p>
				<h1>Interpretation and Definitions</h1>
				<h2>Interpretation</h2>
				<p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
				<h2>Definitions</h2>
				<p>For the purposes of this Plushe User Agreement:</p>
				<ul>
					<li>
						<p><strong>Agreement</strong> means this Plushe User Agreement that forms the entire agreement between You and the Company regarding the use of the Application.</p>
					</li>
					<li>
						<p><strong>Application</strong> means the software program provided by the Company downloaded by You to a Device, named Plushe</p>
					</li>
					<li>
						<p><strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Plushe Internet HongKong Limited, ROOM E,3/F,SOUTHTEX BUILDING, 51 TSUN YIP STREET,KWUN TONG,KOWLOON</p>
					</li>
					<li>
						<p><strong>Content</strong> refers to content such as text, images, or other information that can be posted, uploaded, linked to or otherwise made available by You, regardless of the form of that content.</p>
					</li>
					<li>
						<p><strong>Country</strong> refers to: Hong Kong SAR China</p>
					</li>
					<li>
						<p><strong>Device</strong> means any device that can access the Application such as a computer, a cellphone or a digital tablet.</p>
					</li>
					<li>
						<p><strong>Third-Party Services</strong> means any services or content (including data, information, applications and other products services) provided by a third-party that may be displayed, included or made available by the Application.</p>
					</li>
					<li>
						<p><strong>You</strong> means the individual accessing or using the Application or the company, or other legal entity on behalf of which such individual is accessing or using the Application, as applicable.</p>
					</li>
				</ul>
				<h1>Acknowledgment</h1>
				<p>
					By clicking the "I Agree" button, downloading or using the Application, You are agreeing to be bound by the terms and conditions of this Agreement. If You do not agree to the terms of this Agreement, do not click on the "I Agree" button, do not download or do not use the
					Application.
				</p>
				<p>This Agreement is a legal document between You and the Company and it governs your use of the Application made available to You by the Company.</p>
				<p>The Application is licensed, not sold, to You by the Company for use strictly in accordance with the terms of this Agreement.</p>
				<h1>License</h1>
				<h2>Scope of License</h2>
				<p>The Company grants You a revocable, non-exclusive, non-transferable, limited license to download, install and use the Application strictly in accordance with the terms of this Agreement.</p>
				<p>The license that is granted to You by the Company is solely for your personal, non-commercial purposes strictly in accordance with the terms of this Agreement.</p>
				<h1>Third-Party Services</h1>
				<p>The Application may display, include or make available third-party content (including data, information, applications and other products services) or provide links to third-party websites or services.</p>
				<p>
					You acknowledge and agree that the Company shall not be responsible for any Third-party Services, including their accuracy, completeness, timeliness, validity, copyright compliance, legality, decency, quality or any other aspect thereof. The Company does not assume and shall not
					have any liability or responsibility to You or any other person or entity for any Third-party Services.
				</p>
				<p>
					You must comply with applicable Third parties' Terms of agreement when using the Application. Third-party Services and links thereto are provided solely as a convenience to You and You access and use them entirely at your own risk and subject to such third parties' Terms and
					conditions.
				</p>
				<h1>Term and Termination</h1>
				<p>This Agreement shall remain in effect until terminated by You or the Company. The Company may, in its sole discretion, at any time and for any or no reason, suspend or terminate this Agreement with or without prior notice.</p>
				<p>
					This Agreement will terminate immediately, without prior notice from the Company, in the event that you fail to comply with any provision of this Agreement. You may also terminate this Agreement by deleting the Application and all copies thereof from your Device or from your
					computer.
				</p>
				<p>Upon termination of this Agreement, You shall cease all use of the Application and delete all copies of the Application from your Device.</p>
				<p>Termination of this Agreement will not limit any of the Company's rights or remedies at law or in equity in case of breach by You (during the term of this Agreement) of any of your obligations under the present Agreement.</p>
				<h1>Indemnification</h1>
				<p>
					You agree to indemnify and hold the Company and its parents, subsidiaries, affiliates, officers, employees, agents, partners and licensors (if any) harmless from any claim or demand, including reasonable attorneys' fees, due to or arising out of your: (a) use of the Application;
					(b) violation of this Agreement or any law or regulation; or (c) violation of any right of a third party.
				</p>
				<h1>No Warranties</h1>
				<p>
					The Application is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its affiliates and its and their respective licensors
					and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Application, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may
					arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Application will meet your requirements, achieve any intended
					results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.
				</p>
				<p>
					Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Application, or the information, content, and materials or products included
					thereon; (ii) that the Application will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Application; or (iv) that the Application, its servers, the content, or e-mails sent from or on behalf of
					the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.
				</p>
				<p>
					Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in
					this section shall be applied to the greatest extent enforceable under applicable law. To the extent any warranty exists under law that cannot be disclaimed, the Company shall be solely responsible for such warranty.
				</p>
				<h1>Limitation of Liability</h1>
				<p>
					Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Agreement and your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You for the Application or
					through the Application or 100 USD if You haven't purchased anything through the Application.
				</p>
				<p>
					To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information,
					for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Application, third-party software and/or third-party hardware used with the Application, or otherwise in connection with any provision of
					this Agreement), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.
				</p>
				<p>Some states/jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation or exclusion may not apply to You.</p>
				<h1>Severability and Waiver</h1>
				<h2>Severability</h2>
				<p>
					If any provision of this Agreement is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force
					and effect.
				</p>
				<h2>Waiver</h2>
				<p>
					Except as provided herein, the failure to exercise a right or to require performance of an obligation under this Agreement shall not effect a party's ability to exercise such right or require such performance at any time thereafter nor shall be the waiver of a breach constitute a
					waiver of any subsequent breach.
				</p>
				<h1>Product Claims</h1>
				<p>The Company does not make any warranties concerning the Application.</p>
				<h1>United States Legal Compliance</h1>
				<p>
					You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) You are not listed on any United States
					government list of prohibited or restricted parties.
				</p>
				<h1>Changes to this Agreement</h1>
				<p>
					The Company reserves the right, at its sole discretion, to modify or replace this Agreement at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at the sole
					discretion of the Company.
				</p>
				<p>By continuing to access or use the Application after any revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, You are no longer authorized to use the Application.</p>
				<h1>Governing Law</h1>
				<p>The laws of the Country, excluding its conflicts of law rules, shall govern this Agreement and your use of the Application. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
				<h1>Entire Agreement</h1>
				<p>The Agreement constitutes the entire agreement between You and the Company regarding your use of the Application and supersedes all prior and contemporaneous written or oral agreements between You and the Company.</p>
				<p>You may be subject to additional terms and conditions that apply when You use or purchase other Company's services, which the Company will provide to You at the time of such use or purchase.</p>
				<h1>Contact Us</h1>
				<p>If you have any questions about this Agreement, You can contact Us:</p>
				<ul>
					<li>By email: VIPsupport@plushe.com</li>
				</ul>
			</div>
		</div>
		<!-- 分销 -->
		<div v-else-if="typeId == 16" class="other-info__box">
			<h3>
				<strong><b>Affiliates</b></strong>
			</h3>
			<p>
				Join us, share our brand, collections, and products with your friends, and earn commission.Plushe is an international fashion brand dedicated to plus-size women's clothing and accessories.If you believe that your website or blog are relatable to our values and customers, we invite
				you to join Plushe's affiliate program and start sharing our products to make extra profit.
			</p>
			<h3>
				<strong><b>Earn up to X% commissoi</b></strong>
			</h3>
			<p>Affiliates can earn up to 10% commission of the price of the items purchased. It doesn't include shipping fee, tax, or any returned items.</p>
			<h3>
				<strong><b>Why Become a Plushe Affiliate</b></strong>
			</h3>
			<p>Share your affiliate links with your friends, and earn commission for every successful referral.</p>
			<h3>
				<strong><b>How to Join Click to download Plushe Affiliate App!</b></strong>
			</h3>
			<p style="display: flex">
				<a class="logo-anzhuo" href="#"><img src="@/assets/images/icons/anzhuo.png" /></a><a class="logo-ios" href="#"><img src="@/assets/images/icons/ios.png" /></a>
			</p>
			<h3>
				<strong><b>Want to Earn More?</b></strong>
			</h3>
			<p>Promote Plushe Affiliate App on your social media platforms：</p>
			<p>Share the download link on your page</p>
			<p>Invite members to join so that you can also receive commission from their shared orders</p>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/navbar/index.vue'
import http from '@/api/index'
import Clipboard from '@/mixins/Clipboard'

export default {
	mixins: [Clipboard], // Copied Email Successful!
	data() {
		return {
			title: '',
			typeList: [
				{ name: this.$t('my.shippingInformation'), id: 1 },
				{ name: this.$t('my.returnExchange'), id: 2 },
				{ name: this.$t('other.name8'), id: 3 },
				{ name: this.$t('other.name4'), id: 4 },
				{ name: this.$t('other.name5'), id: 5 },
				{ name: this.$t('other.name6'), id: 6 },
				{ name: this.$t('other.name7'), id: 7 },
				{ name: this.$t('my.support'), id: 12 },
				{ name: this.$t('other.name9'), id: 9 },
			],
			typeId: 1,
			shippingList: [], // 物流方式
			iconList: [
				{ icon: require('@/assets/images/icons/icon-pinterest.png'), url: 'https://www.pinterest.com/plusheplushe/_created/' },
				{ icon: require('@/assets/images/icons/icon-facebook.png'), url: 'https://www.facebook.com/Plushe-106370298179108' },
				{ icon: require('@/assets/images/icons/icon-twitter.png'), url: 'https://twitter.com/Plushe_Plushe' },
				{ icon: require('@/assets/images/icons/icon-instagram.png'), url: 'https://www.instagram.com/plushe_official/' },
				{ icon: require('@/assets/images/icons/icon-youtube.png'), url: 'https://www.youtube.com/channel/UC1zimeXXIcF7HObrwtvoFFA/featured' },
			],
			collapse: {
				account: '',
			},
		}
	},
	components: {
		NavBar,
	},
	created() {
		this.typeId = this.$route.query.id
		const types = this.typeList.find((item) => item.id == this.$route.query.id)
		if (types) {
			this.title = types.name
		}
		if (this.typeId == 1) {
			this.getShippings()
		}
	},
	watch: {
		$route(to) {
			this.typeId = to.query.id
			const types = this.typeList.find((item) => item.id == this.$route.query.id)
			if (types) {
				this.title = types.name
			}
			if (this.typeId == 1) {
				this.getShippings()
			}
		},
	},
	methods: {
		getShippings() {
			http.goodsDetailApi.shipping().then((res) => {
				this.shippingList = res.data
			})
		},
		fqaGoPage(path, query) {
			this.$router.push({
				path,
				query,
			})
		},
		goto(url) {
			window.location.href = url
		},
	},
}
</script>

<style lang="less" scoped>
@import '@/style/variable.less';
.other-info {
	min-height: 100%;

	background: @color-bg;
	.other-info__box {
		&.size-guide {
			img {
				display: block;
				margin: 100px auto 20px;
			}
		}
		&.shipping-information {
			p {
				color: @color-222;
				margin-bottom: 10px;
			}
			.red {
				margin: 20px 0;
				color: @color-promo;
			}
		}
		&.return-exchange {
			p {
				line-height: 22px;
				margin-bottom: 10px;
				color: @color-222;
			}
			h3 {
				margin-bottom: 10px;
				margin-top: 44px;
			}
		}
		.logo-anzhuo,
		.logo-ios {
			display: block;
			max-height: 30px;
			width: 50px;
			img {
				max-height: 100%;
			}
		}
		padding: 20px 16px;
		color: @color-222;
		.link {
			color: @color-promo;
		}
		.fontSize12 {
			font-size: 12px;
		}
		p {
			margin-bottom: 20px;
			font-size: 14px;
			line-height: 20px;
			color: @color-666;
		}
		.red {
			color: @color-promo;
		}
		h2 {
			font-size: 18px;
			color: @color-222;
			line-height: 21px;
			margin-bottom: 22px;
			font-weight: 600;
		}
		h3 {
			font-size: 16px;
			color: @color-222;
			line-height: 20px;
			margin-bottom: 20px;
		}
		h5 {
			color: @color-222;
			font-size: 14px;
			font-weight: 500;
			margin-bottom: 6px;
		}
		.other-info__pics {
			text-align: center;
			font-size: 0;
			.other-info__img {
				width: 100%;
				height: auto;
			}
		}
		.other-info__ol {
			margin-bottom: 20px;
			li {
				margin-bottom: 10px;
				font-size: 14px;
				line-height: 17px;
				color: @color-595;
			}
		}
		.TableWrapper {
			margin-bottom: 10px;
			.table {
				width: 100%;
				border-top: 1px solid #d1d1d1;
				border-left: 1px solid #d1d1d1;
				.table-tr {
					display: flex;
					font-size: 14px;
					color: @color-222;
					line-height: 17px;
					text-align: center;
					&.table-head {
						background: #f6f6f6;
					}
					&.table-body {
						color: #222;
						font-weight: 500;
						background: #fff;
					}
					li {
						padding: 16px 6px;
						flex: 1;
						max-width: 33.333%;
						border-bottom: 1px solid #d1d1d1;
						border-right: 1px solid #d1d1d1;
						white-space: pre-wrap;
						word-break: break-word;
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
	.connect-us {
		font-size: 14px;
		text-align: center;
		padding-bottom: 24px;
		border-bottom: 1px solid @color-EBE;
		.email_label {
			color: @color-222;
			font-weight: 500;
		}
		.email {
			color: @color-595;
		}
		.copy {
			font-size: 12px;
			margin-left: 24px;
			color: @color-999;
			border-bottom: 1px solid @color-999;
		}
		.other-icons-img {
			width: 24px;
			margin-right: 20px;
		}
		.other-icons-img:nth-last-child(1) {
			margin-right: 0;
		}
	}
	.find-answer {
		text-align: center;
		padding: 24px 0;
		h2 {
			margin-bottom: 20px;
		}
		.find-answer-item {
			width: 127px;
			margin: 0 15px 20px;

			.find-answer-cont {
				margin-bottom: 10px;
				img {
					height: 55px;
				}
			}
		}
	}

	.collapse_item {
		padding-top: 64px;
		h2 {
			font-weight: 600px;
			text-align: center;
		}
		/deep/ .van-collapse {
			.van-collapse-item__title--expanded::after {
				display: none;
			}
			.van-cell {
				background: @color-bg;
			}
			.van-collapse-item--border::after {
				border: 0;
			}
			.van-cell__title {
				font-size: 16px;
				font-weight: 500;
				color: @color-222;
			}
			.van-collapse-item__title {
				flex-direction: row-reverse;
				padding: 0;
			}
			.van-cell__right-icon {
				margin-left: 0;
				margin-right: 4px;
			}
			.van-collapse-item__content {
				padding: 6px 0 20px 26px;
				font-weight: 400;
				line-height: 22px;
				color: @color-666;
				background: @color-bg;
			}
		}
	}
	.paypal {
		font-size: 12px;
		line-height: 1.5;
		padding: 0 20px;
		h1 {
			margin-bottom: 10px;
			margin-top: 10px;
			line-height: 1;
		}
		h2 {
			margin-top: 5px;
			margin-bottom: 10px;
		}
		h1 + h2 {
			margin-top: 0;
		}
	}

	// plushe--关于我们样式:
	.other-about {
		padding: 10px 16px 60px;
		color: @color-222;
		font-size: 13px;
		.other-about__title {
			padding-top: 20px;
			font-size: 18px;
			font-weight: 700;
			margin-bottom: 10px;
		}
		.other-about__text {
			line-height: 22px;
			margin-bottom: 10px;
		}
		.other-about__img {
			display: block;
			width: 100%;
			margin-bottom: 10px;
		}
	}
}
</style>
