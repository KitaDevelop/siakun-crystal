import React from 'react'

export default function Navbar({ title, icon }: NavbarProps) {
  return (
    <div className="navbar shadow-lg bg-neutral text-neutral-content rounded-box">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost text-xl">{icon}</button>
      </div>
      <div className="flex-1">
        <span className="font-bold uppercase">{title}</span>
      </div>
      <div className="flex-none">
        Gue Lagi Login
        <button className="ml-2 btn btn-square btn-ghost">
          <div className="avatar">
            <div className="rounded-full w-10 h-10">
              <img src="https://res.cloudinary.com/teepublic/image/private/s--x5AXS-qB--/c_crop,x_10,y_10/c_fit,w_1109/c_crop,g_north_west,h_1260,w_1260,x_-76,y_-163/co_rgb:ffffff,e_colorize,u_Misc:One%20Pixel%20Gray/c_scale,g_north_west,h_1260,w_1260/fl_layer_apply,g_north_west,x_-76,y_-163/bo_0px_solid_white/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1597426756/production/designs/13071953_0.jpg" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

export interface NavbarProps {
  title: String
  icon: React.ReactNode
}
