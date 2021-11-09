import Layout from '@components/Layout'
import { NavbarProps } from '@components/Navbar'
import { Navigation, navigation } from '@constants/navigation'
import React from 'react'
import ChartOfAccount from '@components/CoA'

interface Props {}

const navInfo: Navigation = navigation.find((n) => n.name == 'Chart of Accounts') || ({} as Navigation)
const meta: NavbarProps = {
  title: navInfo.name,
  icon: navInfo.icon,
}

export const CoAPage = (props: Props) => {
  return (
    <Layout navbarProps={meta}>
      <ChartOfAccount />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nam, ut consequatur eaque iste illo, mollitia
        facere dignissimos repudiandae aliquam porro eveniet temporibus eius perferendis. Nemo quae ullam quam,
        obcaecati ut provident. Eius commodi voluptatum iusto iure distinctio perspiciatis sint molestias error,
        laboriosam dolorum? Incidunt necessitatibus aperiam deleniti minima expedita, cupiditate debitis ad! Quidem
        autem, laboriosam voluptatum, natus, neque delectus temporibus minima aut maxime atque cupiditate sit dolorum.
        Nam ipsum aperiam repellat nulla quod reiciendis corporis culpa natus totam optio. Quibusdam porro tenetur
        excepturi voluptas est accusantium distinctio! Ipsa numquam recusandae blanditiis voluptatibus mollitia animi
        voluptas perspiciatis, perferendis suscipit aperiam rerum similique doloribus maiores, corrupti, cumque optio
        quisquam quis. Eos amet voluptate doloremque adipisci. Velit voluptatem temporibus iure expedita ratione, nulla
        repudiandae deleniti omnis dolores, voluptate unde blanditiis harum praesentium est illo quidem dignissimos
        tempora optio quisquam? A doloremque exercitationem recusandae consequuntur maiores tempore beatae delectus enim
        laboriosam, dignissimos quibusdam repudiandae earum. Possimus animi velit provident soluta optio delectus nam
        obcaecati vero doloremque sapiente dolorum inventore eaque quia veniam vel suscipit ipsa quam doloribus unde
        fugit error dolorem, consequuntur pariatur magnam? Iste inventore consectetur rerum officiis ipsa doloribus
        culpa id ipsum a quasi? Architecto harum optio esse qui, debitis delectus iste dolorum quas minima cumque
        perferendis fugiat consequuntur reprehenderit illum? Vitae excepturi impedit in, expedita, quidem iusto ad
        repellat laudantium eligendi aspernatur, velit quisquam. Earum pariatur corporis consectetur magni qui tempora
        laborum reiciendis ea rem nesciunt, necessitatibus beatae at! Officia velit similique error dolor ea non. Quae,
        nam. Ipsum, provident. Omnis est a quam rerum consequuntur iure id, dolorem perferendis enim repellat excepturi
        deleniti consequatur unde reiciendis iusto facilis quas atque eaque molestiae quae vel odit minus? Voluptates
        officiis ex, eos aliquid ullam qui esse inventore aperiam quo omnis asperiores voluptate, deserunt explicabo!
        Ipsam voluptates asperiores voluptas tempore quos sunt nobis accusantium nemo hic illum ipsa dolorem iure
        aliquam voluptatibus sequi ducimus a facere possimus sint iste ea, repellat mollitia eveniet. Dolores pariatur
        iste enim sequi, aliquid ut cumque suscipit voluptatibus molestiae tempore voluptatem debitis corrupti ducimus,
        a consequatur soluta eveniet. Velit, totam, repellat dolorem quisquam minus dolores aliquam facilis
        exercitationem, deserunt maxime illum deleniti! Architecto error similique ab ex, quo placeat, perspiciatis ut
        commodi consequatur quas quaerat aut natus! Id culpa aspernatur doloremque dolorum accusamus quasi tempora ipsum
        ab. Nulla laborum voluptate eaque, saepe harum magnam maiores libero quis architecto eos doloremque a ducimus
        aperiam sed autem, ea, porro illo odio eveniet laudantium? Necessitatibus doloremque odio iusto ad nihil enim ab
        perspiciatis corrupti, a ut laboriosam veritatis tempora mollitia placeat aspernatur voluptatibus deleniti
        tempore magnam ullam sint fugit veniam consequatur fugiat asperiores? Nostrum velit voluptates hic minima ea
        aliquid dignissimos nesciunt expedita cupiditate facere tempore magni impedit adipisci error magnam, blanditiis,
        mollitia esse quasi optio eveniet quod veritatis laudantium fugiat eos. Veritatis culpa atque corporis obcaecati
        expedita, cum rem laborum eaque, at vero aliquam eum iure ut qui facere odio? Nemo numquam earum quidem hic
        pariatur vel tenetur obcaecati odit, nihil, cum sint eaque saepe voluptatibus aspernatur magnam nulla error, eum
        quae ad cumque provident nam recusandae repellat placeat. Aliquid quos facilis repellendus repudiandae cum
        consectetur rem iusto quibusdam! Tempore, odio! Tempore reiciendis, labore accusamus officia officiis est odio
        doloribus consectetur magni voluptatem perferendis dolores quas cumque ducimus laboriosam neque dolor culpa aut
        saepe explicabo omnis? Modi, doloribus perferendis quaerat eos aut reiciendis odit, dignissimos repellat ipsa
        beatae quidem magnam aliquid doloremque hic! Ipsum, cupiditate, nesciunt corporis autem odit laudantium nobis
        repudiandae facere, officia laborum reiciendis corrupti velit. Eius ut aliquam quis quae explicabo, similique in
        impedit ipsum voluptates iusto natus eum minus ducimus. Veritatis, nostrum rerum quaerat odio, repellendus non
        quasi numquam eveniet culpa magnam incidunt cupiditate exercitationem temporibus ad eaque velit error officia
        recusandae vel, ratione ea aperiam quos saepe? Doloremque placeat dolores, quibusdam unde rerum porro debitis
        vel dolore! Veniam, adipisci atque aperiam sed magnam accusantium quasi officiis ea, voluptatibus doloribus
        saepe facilis. Temporibus voluptas voluptatem corrupti rem, quo iste impedit quia veritatis maxime rerum
        tenetur, nesciunt dolorem doloremque cum tempora ad odio accusamus. Repellat officia nulla molestias debitis,
        omnis quam! Culpa corporis molestias laboriosam, aliquam fugit unde suscipit sint illum veniam a iure,
        laudantium nesciunt sit iste totam rem corrupti, quas facilis magni? Voluptatem mollitia eos aspernatur veniam
        magnam quasi! Inventore nesciunt minima veniam soluta distinctio laborum? Molestiae labore ducimus temporibus
        veritatis nam deleniti nisi voluptate asperiores harum eveniet accusantium, dolore earum eos sint aut minus
        recusandae autem quaerat! Laborum, laboriosam dolorem quis quia modi eius assumenda quo tempore sed. Labore
        laudantium nesciunt harum modi soluta quae quod error tempora, quibusdam aliquid, est rerum doloribus rem
        dignissimos ratione dolor possimus animi sed quos facilis. Fugit beatae, repellendus inventore nihil in libero
        at ea aspernatur saepe, dolorem fuga architecto, dolor quia quibusdam. Esse eos eveniet vel deleniti inventore
        dolore distinctio quos, delectus rerum quo ipsa ex? Ab cupiditate odio cum sapiente, enim nam, placeat numquam
        sed ipsa laboriosam nobis! Placeat rerum fuga, quisquam saepe alias quasi perferendis harum nam id laborum
        tempore ut rem pariatur suscipit, quia iure dolorum cum esse deserunt exercitationem corrupti eum incidunt ullam
        nobis? Molestias, recusandae alias non nihil ad quibusdam. Et enim praesentium sequi reprehenderit quod eum unde
        pariatur aperiam, fugiat saepe! Id nisi est similique modi expedita optio aperiam facere quia soluta distinctio
        itaque necessitatibus eius, non magnam, natus tempora iusto ratione tenetur! Ea explicabo nemo consectetur
        perspiciatis, repudiandae nostrum iste hic illo quaerat natus exercitationem pariatur libero modi, fugit
        praesentium impedit alias delectus reprehenderit minus magnam! Dolores eaque voluptates similique placeat harum
        ipsa, natus dolore adipisci ipsum itaque eum dolorem vitae iste odit velit obcaecati laudantium pariatur,
        asperiores non exercitationem debitis tenetur odio! Officiis alias repellat temporibus quibusdam illo ducimus?
        Fugiat impedit quod ex quos ut quaerat eos nam provident, nulla magnam molestiae inventore aliquam praesentium,
        modi error! Aspernatur labore cum voluptatem ducimus excepturi, porro, quis officia molestiae asperiores eos
        nemo recusandae culpa animi velit maxime rem nulla tenetur repellat possimus officiis provident quidem optio
        totam consectetur. Deserunt nulla pariatur laudantium delectus, fugit aliquid fuga perspiciatis aperiam
        recusandae sequi.
      </p>
    </Layout>
  )
}

export default CoAPage
