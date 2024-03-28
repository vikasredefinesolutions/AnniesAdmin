import React from "react";

const ShoppingCart = () => {
  return (
    <>
      <section className="bg-tertiary">
        <div className="container mx-auto">
          <div className="py-[20px]">
            <div>
              <ul className="flex flex-wrap items-center gap-[10px] text-[14px] font-semibold font-sub">
                <li>
                  <a href="javascript:void(0)" className="text-anchor">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21.621"
                      height="19.897"
                      viewBox="0 0 21.621 19.897"
                    >
                      <path
                        id="Path_48756"
                        data-name="Path 48756"
                        d="M2.25,12,11.2,3.045a1.126,1.126,0,0,1,1.591,0L21.75,12M4.5,9.75V19.875A1.125,1.125,0,0,0,5.625,21H9.75V16.125A1.125,1.125,0,0,1,10.875,15h2.25a1.125,1.125,0,0,1,1.125,1.125V21h4.125A1.125,1.125,0,0,0,19.5,19.875V9.75M8.25,21H16.5"
                        transform="translate(-1.189 -1.853)"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </a>
                </li>
                <li>/</li>
                <li>
                  <a href="javascript:void(0)">
                    Perennial Plants for Your Garden
                  </a>
                </li>
                <li>/</li>
                <li>Achillea millefolium</li>
              </ul>
            </div>
          </div>

          <div className="pt-[10px] pb-[30px]">
            <div className="grid grid-cols-12 gap-y-[20px]">
              <div className="col-span-12 lg:col-span-6">
                <div className="grid grid-cols-12 gap-[10px] sticky top-[10px]">
                  <div className="col-span-12 md:col-span-2 order-2 md:order-1 sub-img-slider slick-initialized slick-slider slick-vertical">
                    <div
                      className="slick-list draggable"
                      style={{ height: "638px", padding: "50px 0px" }}
                    >
                      <div
                        className="slick-track"
                        style={{
                          opacity: "1",
                          height: "441px",
                          "-webkit-transform": "translate3d(0px, 0px, 0px)",
                          "-ms-transform": "translate3d(0px, 0px, 0px)",
                          transform: "translate3d(0px, 0px, 0px)",
                        }}
                      >
                        <div
                          className="md:mb-[10px] last:mb-0 slick-slide slick-current slick-center"
                          style={{ width: "122px" }}
                          data-slick-index={0}
                          aria-hidden="true"
                          tabIndex={0}
                        >
                          <div className="relative rounded-tl-default rounded-br-default overflow-hidden mb-[20px] mr-[20px] md:mr-0 last:mb-0 border-[2px] border-[#9F2D3C]">
                            <div className="rounded-tl-default rounded-br-default overflow-hidden sub-img-item border-[10px] border-transparent">
                              <img
                                className="md:max-h-full rounded-tl-default rounded-br-default overflow-hidden"
                                src="images/products/new-product-01.jpg"
                                alt
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className="md:mb-[10px] last:mb-0 slick-slide"
                          style={{ width: "122px" }}
                          data-slick-index={1}
                          aria-hidden="true"
                          tabIndex={0}
                        >
                          <div className="relative rounded-tl-default rounded-br-default overflow-hidden mb-[20px] mr-[20px] md:mr-0 last:mb-0 border-[2px] border-transparent">
                            <div className="rounded-tl-default rounded-br-default overflow-hidden sub-img-item">
                              <img
                                className="md:max-h-full rounded-tl-default rounded-br-default overflow-hidden"
                                src="images/products/new-product-02.jpg"
                                alt
                              />
                            </div>
                          </div>
                        </div>

                        <div
                          className="md:mb-[10px] last:mb-0 slick-slide"
                          style={{ width: "122px" }}
                          data-slick-index={2}
                          aria-hidden="true"
                          tabIndex={0}
                        >
                          <div className="rounded-tl-default rounded-br-default overflow-hidden mb-[20px] mr-[20px] md:mr-0 last:mb-0 border-[2px] border-transparent">
                            <div className="relative rounded-tl-default rounded-br-default overflow-hidden sub-img-item">
                              <img
                                className="md:max-h-full rounded-tl-default rounded-br-default overflow-hidden"
                                src="images/products/new-product-02.jpg"
                                alt
                              />

                              <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={52}
                                  height={52}
                                  viewBox="0 0 52 52"
                                >
                                  <g
                                    id="Group_5396"
                                    data-name="Group 5396"
                                    transform="translate(-2 -2)"
                                  >
                                    <path
                                      id="Path_48825"
                                      data-name="Path 48825"
                                      d="M53,28A25,25,0,1,1,28,3,25,25,0,0,1,53,28Z"
                                      transform="translate(0 0)"
                                      fill="none"
                                      stroke="#edfffa"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                    />
                                    <path
                                      id="Path_48826"
                                      data-name="Path 48826"
                                      d="M26.861,17.29a1.042,1.042,0,0,1,0,1.822L11.3,27.759a1.042,1.042,0,0,1-1.547-.911V9.554A1.04,1.04,0,0,1,11.3,8.645L26.861,17.29Z"
                                      transform="translate(12 9.799)"
                                      fill="none"
                                      stroke="#edfffa"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                    />
                                  </g>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-12 md:col-span-10 order-1 md:order-2 main-image-outer slick-initialized slick-slider">
                    <div className="slick-list draggable">
                      <div
                        className="slick-track"
                        style={{
                          opacity: "1",
                          width: "4564px",
                          "-webkit-transform": "translate3d(-652px, 0px, 0px)",
                          "-ms-transform": "translate3d(-652px, 0px, 0px)",
                          transform: "translate3d(-652px, 0px, 0px)",
                        }}
                      >
                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] flex items-center justify-center h-full slick-slide slick-cloned"
                          data-slick-index={-1}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <iframe
                            src="https://player.vimeo.com/video/454207730?background=1"
                            frame
                            allowFullScreen
                            className="w-full aspect-video"
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] slick-slide slick-current slick-active"
                          data-slick-index={0}
                          aria-hidden="false"
                          tabIndex={0}
                          style={{ width: "652px" }}
                        >
                          <img
                            src="images/products/new-product-01.jpg"
                            className="hover:scale-125 transition-all duration-700"
                            alt
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] slick-slide"
                          data-slick-index={1}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <img
                            src="images/products/new-product-02.jpg"
                            className="hover:scale-125 transition-all duration-700"
                            alt
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] flex items-center justify-center h-full slick-slide"
                          data-slick-index={2}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <iframe
                            src="https://player.vimeo.com/video/454207730?background=1"
                            frame
                            allowFullScreen
                            className="w-full aspect-video"
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] slick-slide slick-cloned"
                          data-slick-index={3}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <img
                            src="images/products/new-product-01.jpg"
                            className="hover:scale-125 transition-all duration-700"
                            alt
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] slick-slide slick-cloned"
                          data-slick-index={4}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <img
                            src="images/products/new-product-02.jpg"
                            className="hover:scale-125 transition-all duration-700"
                            alt
                          />
                        </div>

                        <div
                          className="main-image rounded-tl-2xl rounded-br-2xl overflow-hidden px-[2px] flex items-center justify-center h-full slick-slide slick-cloned"
                          data-slick-index={5}
                          aria-hidden="true"
                          tabIndex={-1}
                          style={{ width: "652px" }}
                        >
                          <iframe
                            src="https://player.vimeo.com/video/454207730?background=1"
                            frame
                            allowFullScreen
                            className="w-full aspect-video"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <div className="pl-0 lg:pl-[70px]">
                  <div className="text-2xl-text font-bold font-sub">
                    Achillea millefolium
                  </div>

                  <div className="text-2xl-text italic font-sub opacity-80 mb-[15px]">
                    'Rosa Maria'
                  </div>

                  <div className="text-extra-small-text mb-[30px] flex flex-wrap items-center gap-[8px]">
                    <div>
                      <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                        star
                      </span>
                      <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                        star
                      </span>
                      <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                        star
                      </span>
                      <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                        star
                      </span>
                      <span className="material-icons-outlined text-[#FFC607] text-sm tracking-normal">
                        star_border
                      </span>
                    </div>

                    <div>4.7</div>

                    <div>
                      <a href="javascript:void(0)" className="underline">
                        101 Reviews
                      </a>
                    </div>

                    <div>
                      <a href="javascript:void(0)" className="underline">
                        Write a review
                      </a>
                    </div>
                  </div>

                  <div className="text-default-text mb-[20px] font-sub font-semibold flex items-center gap-[12px]">
                    <div className="flex items-center whitespace-nowrap gap-[8px] mb-[20px] sm:mb-0">
                      <div>Shipping to</div>

                      <div>CA 94801</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-[8px]">
                      <div className="bg-[#3B5697] bg-opacity-30 rounded-xs flex items-end gap-[5px] py-[7px] px-[18px]">
                        <div className="text-extra-small-text">ZONE:</div>

                        <div className="text-normal-text font-semibold">7B</div>
                      </div>

                      <div>
                        <a href="javascript:void(0);" className="underline">
                          Change My Zone
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="text-small-text font-semibold mb-[30px]">
                    <span className="text-[#9C331C]">
                      This product will begin shipping the week of 09/11/2023
                    </span>
                  </div>

                  <div className="text-large-text font-bold mb-[10px]">
                    $70.00
                  </div>

                  <div className="mb-[30px] flex flex-wrap gap-[20px]">
                    <div
                      className="flex items-center border border-primary rounded-xs text-medium-text"
                      x-data="{quantity : 1}"
                    >
                      <a
                        href="javascript:void(0);"
                        className="inline-block text-primary w-[35px] text-center font-bold"
                      >
                        -
                      </a>

                      <div className="w-[40px] text-center font-bold">
                        <input
                          className="w-full bg-transparent text-center focus:outline-none"
                          x-model="quantity"
                          defaultValue
                        />
                      </div>
                      <a
                        href="javascript:void(0);"
                        className="inline-block text-primary w-[35px] text-center font-bold"
                      >
                        +
                      </a>
                    </div>

                    <div>
                      <a
                        href="javascript:void(0)"
                        className="btn btn-primary btn-md uppercase !font-body !rounded-xs"
                      >
                        Add to Cart
                      </a>
                    </div>
                  </div>

                  <div className="mb-[10px] flex items-center gap-[10px]">
                    <a
                      href="javascript:void(0)"
                      className="btn btn-outline-primary uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20.2"
                        height="19.732"
                        viewBox="0 0 20.2 19.732"
                      >
                        <path
                          id="Icon_ionic-ios-heart"
                          data-name="Icon ionic-ios-heart"
                          d="M16.675,3.938h-.044a4.978,4.978,0,0,0-4.156,2.275A4.978,4.978,0,0,0,8.319,3.938H8.275a4.946,4.946,0,0,0-4.9,4.944,10.65,10.65,0,0,0,2.091,5.806,36.648,36.648,0,0,0,7.009,6.751,36.648,36.648,0,0,0,7.009-6.751,10.65,10.65,0,0,0,2.091-5.806A4.946,4.946,0,0,0,16.675,3.938Z"
                          transform="translate(-2.375 -2.938)"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                        />
                      </svg>
                      <span>Add to wishlist</span>
                    </a>

                    <div
                      className="relative inline-block"
                      x-data="{ open : false}"
                      x-on:mouseout="open = false"
                    >
                      <a
                        href="javascript:void(0);"
                        className="text-[#9C331C]"
                        x-on:mouseover="open = true"
                        x-on:mouseout="open = false"
                      >
                        <span className="material-icons">info</span>
                      </a>

                      <div
                        className="bg-[#FFF0ED] rounded-sm m-[2px] p-[10px] shadow absolute lg:left-0 bottom-full w-[220px]"
                        x-on:mouseover="open = true"
                        x-on:mouseout="open = false"
                        x-show="open"
                        style={{ display: "none" }}
                      >
                        Save your time. Add your favorites in one location.
                      </div>
                    </div>
                  </div>

                  <div className="mb-[40px] font-semibold italic text-small-text">
                    We will email you as soon as the plant is available
                  </div>

                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>Description</div>

                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>

                    <div className x-show="open">
                      <div className="text-medium-text font-bold font-sub mb-[10px]">
                        NEW, super pretty, and seriously garden worthy!
                      </div>

                      <div className="text-default-text mb-[30px]">
                        This lovely, evergreen yarrow remains a tidy 18"x24",
                        perfect for any gardening scheme no matter how small the
                        area. From dry garden to cottage garden, sidewalk strip
                        to patio container you will definitely want to find
                        space for this winner!
                        <span className="font-semibold">
                          Flowering Spring thru Fall
                        </span>{" "}
                        with 3-4" flat-topped romantic rosy pink umbels that bob
                        above ferny blue-green fragrant foliage, providing a
                        major magnet for
                        <span className="font-semibold">
                          butterflies, bees and other pollinators
                        </span>
                        . It can take hot, like
                        <span className="font-semibold">really hot</span>,
                        climates and just about any soil, including clay. It's
                        best to acclimate it with regular water for the first
                        growing season but after that it will be drought
                        tolerant (though it's prettiest with low water rather
                        than no water). Easy to grow, easy to care for and
                        deadheading will encourage lovely, vase-worthy blooms
                        for a loooong season! Added bonus? Deer and rabbit
                        resistant!
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>Information</div>

                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>

                    <div className x-show="open">
                      <div className="bg-primary text-white text-default-text font-semibold p-[30px] lg:rounded-tl-xl lg:rounded-br-xl mb-[30px] mx-[-15px] lg:mx-0">
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Item ID
                          </div>

                          <div className="w-2/3 px-[15px]">4801</div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Pot Size
                          </div>
                          <div className="w-2/3 px-[15px]">4-inch</div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            LifeSpan
                          </div>
                          <div className="w-2/3 px-[15px]">
                            Perennials and Annuals
                          </div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Flower Colors
                          </div>
                          <div className="w-2/3 px-[15px]">Pink - Magenta</div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Bloom Time
                          </div>
                          <div className="w-2/3 px-[15px]">Spring, Summer</div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Zones
                          </div>
                          <div className="w-2/3 px-[15px]">
                            9a, 10a, 10b, 11a, 11b
                          </div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Sun Exposure
                          </div>
                          <div className="w-2/3 px-[15px]">Full Sun</div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[20px] last:mb-0">
                          <div className="w-1/3 px-[15px] font-semibold font-sub">
                            Water Needs
                          </div>
                          <div className="w-2/3 px-[15px]">
                            Average, Low Water
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>Special Features</div>
                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>
                    <div className="mb-[30px]" x-show="open">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] text-default-text">
                        <div className="col-span-1">
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-primary rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width={20}
                                  height="18.121"
                                  viewBox="0 0 20 18.121"
                                >
                                  <defs>
                                    <clipPath id="clip-path">
                                      <rect
                                        id="Rectangle_18527"
                                        data-name="Rectangle 18527"
                                        width={20}
                                        height="18.121"
                                        fill="#fff"
                                      />
                                    </clipPath>
                                  </defs>
                                  <g
                                    id="Group_5406"
                                    data-name="Group 5406"
                                    clipPath="url(#clip-path)"
                                  >
                                    <path
                                      id="Path_48831"
                                      data-name="Path 48831"
                                      d="M207.989,196.6a6.564,6.564,0,0,0,2.57.355,6.408,6.408,0,0,0,1.731-.366q-.04-.269-.07-.54a15.611,15.611,0,0,1-.093-2.052,3.041,3.041,0,0,1-3.973-.125c0,.008,0,.015,0,.023a15.584,15.584,0,0,1-.1,2.207q-.029.25-.067.5"
                                      transform="translate(-200.143 -186.554)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48832"
                                      data-name="Path 48832"
                                      d="M188.917,418.478l-.183,0A6.047,6.047,0,0,1,186.4,418a6.523,6.523,0,0,1-.765-.378,5.93,5.93,0,0,0,.342.582,3.049,3.049,0,0,0,5.478,0,5.994,5.994,0,0,0,.382-.661,6.567,6.567,0,0,1-.681.372,5.668,5.668,0,0,1-2.244.559"
                                      transform="translate(-178.637 -401.797)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48833"
                                      data-name="Path 48833"
                                      d="M178.618,354.581a6.964,6.964,0,0,1-2.671.529h-.078a7.045,7.045,0,0,1-2.7-.582c-.1-.043-.2-.086-.289-.131a6.555,6.555,0,0,1-.58,1.181q.1.337.221.654c.039.029.091.066.155.109a5.9,5.9,0,0,0,3.394,1,5.711,5.711,0,0,0,3.05-1.082q.089-.063.165-.121.066-.177.124-.359a6.328,6.328,0,0,1-.652-1.255l-.138.058"
                                      transform="translate(-165.8 -341.029)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48834"
                                      data-name="Path 48834"
                                      d="M191.541,275.779v.006c-.123.7-.249,1.417-.435,2.106-.045.165-.093.329-.146.49a6.8,6.8,0,0,0,2.869.7,6.684,6.684,0,0,0,2.755-.566q-.1-.28-.173-.569c-.189-.692-.316-1.415-.439-2.118l-.009-.055a6.759,6.759,0,0,1-1.767.364c-.146.009-.291.014-.436.014a6.937,6.937,0,0,1-2.2-.361l-.017-.006"
                                      transform="translate(-183.756 -265.365)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48835"
                                      data-name="Path 48835"
                                      d="M163.756.654a3.451,3.451,0,0,1,2.086,1.6c.034.057.065.114.094.17s.057.113.081.168.052.117.073.172a2.67,2.67,0,1,0,2.615-.023q.033-.083.075-.172c.025-.054.053-.11.083-.167A3.477,3.477,0,0,1,171.03.654a.334.334,0,0,0-.187-.641,4.291,4.291,0,0,0-1.585.837,4.108,4.108,0,0,0-.9,1.089q-.061.106-.112.208c-.029.058-.057.115-.082.17s-.052.117-.074.172a2.681,2.681,0,0,0-1.379.012q-.033-.084-.073-.172c-.025-.055-.052-.112-.081-.17s-.076-.146-.119-.221A4.109,4.109,0,0,0,165.528.85a4.288,4.288,0,0,0-1.585-.837.333.333,0,1,0-.187.64"
                                      transform="translate(-157.348 0)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48836"
                                      data-name="Path 48836"
                                      d="M335.1,209.935a2.451,2.451,0,0,0-.453-1.164,15.319,15.319,0,0,0-3.679-3.706,22.022,22.022,0,0,0-2.508-1.5q-.153-.079-.309-.155t-.329-.158q-.181-.085-.362-.167a15.215,15.215,0,0,0,.1,1.826c.015.136.033.273.052.409.009.063.018.126.028.188s.02.126.03.188c.007.041.014.081.021.122a22.169,22.169,0,0,0,.458,2.186c.039.137.08.273.124.406.02.06.04.119.061.178s.043.117.065.175a6.124,6.124,0,0,0,.452.936c.043.072.088.144.134.214s.09.133.138.2a5.08,5.08,0,0,0,.594.677,6.456,6.456,0,0,0,2.207,1.359,3.668,3.668,0,0,0,1.179.224,1.836,1.836,0,0,0,1.034-.286,2.48,2.48,0,0,0,.965-2.151"
                                      transform="translate(-315.108 -195.426)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48837"
                                      data-name="Path 48837"
                                      d="M6.811,207.507c.02-.06.04-.119.059-.18q.051-.16.1-.322c.194-.691.322-1.42.453-2.166,0-.023.008-.047.012-.071.011-.062.021-.125.031-.187s.02-.126.029-.19c.017-.12.033-.24.048-.36a15.193,15.193,0,0,0,.109-1.925l-.094.042c-.115.052-.228.105-.342.16s-.212.1-.317.154a22.054,22.054,0,0,0-2.755,1.622,15.342,15.342,0,0,0-3.679,3.706,2.443,2.443,0,0,0-.453,1.164,2.477,2.477,0,0,0,.964,2.15,2.553,2.553,0,0,0,2.213.062,6.459,6.459,0,0,0,2.207-1.359,5.1,5.1,0,0,0,.706-.836c.048-.071.094-.143.138-.215s.092-.155.135-.235a6.532,6.532,0,0,0,.377-.839c.021-.059.042-.118.062-.177"
                                      transform="translate(0 -194.483)"
                                      fill="#fff"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div>Attracts Bees</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#9C331C] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="18.177"
                                  height="21.801"
                                  viewBox="0 0 18.177 21.801"
                                >
                                  <path
                                    id="Path_48895"
                                    data-name="Path 48895"
                                    d="M13.761,16.6c2.794-3.308,4.377-9.855,3.909-13.189C17.317.9,15.972-.853,14.278.437c-1.279.974-1.7,2.322-3.594,3.713C8.961,5.412,6.985,6.785,6.97,9.008a14.333,14.333,0,0,0,1.437,4.5,6.075,6.075,0,0,1-1.843-3.013c-1.169-.254-1.926.024-3.309.834-3.457,2.025-6.523,6.608,3.94,7.3A12.447,12.447,0,0,0,9.207,18.6q-.689.159-1.47.285c-2.648,1.889-2.2,4.524-.315,1.631a5.02,5.02,0,0,1,3.83-1.909c1.4-.152,3.242-.689,3.721-1.782.207-.471.422-.582.6-.527a.746.746,0,0,0,.94-.991,7.013,7.013,0,0,0,1.573-1.88c.353-.642-.444-.738-.381-.031.042.468-.733,1.28-1.292,1.772-.168-.155-.477-.162-.937.17-.412.289-.351.54-.845.483.013-.048,0-.2.016-.25a3.954,3.954,0,0,1-.888,1.027"
                                    transform="translate(0 -0.001)"
                                    fill="#fff"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <div>Attracts Butterflies</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#694D84] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="23.166"
                                  height="22.98"
                                  viewBox="0 0 23.166 22.98"
                                >
                                  <path
                                    id="Path_48985"
                                    data-name="Path 48985"
                                    d="M16.476,22.983a.651.651,0,0,1-.652-.652,2.316,2.316,0,0,0-2.259-2.291.652.652,0,0,1-.409-.2,5.009,5.009,0,0,0-4.035-1.365.651.651,0,0,1-.728-.533c0-.027-.531-2.818-2.589-3.848a.656.656,0,0,1-.2-.159,6.1,6.1,0,0,1-1.346-2.364.874.874,0,0,1,.243-.783.936.936,0,0,1,.833-.206.684.684,0,0,0-.377-.433.457.457,0,0,0-.455,0,1.012,1.012,0,0,1-.99.187c-1.066-.34-2.117-2.387-2.271-3a5.112,5.112,0,0,1-.1-.861C1.114,6.169,1.066,5.455.919,5.35a.99.99,0,0,1-.813-.426,1.04,1.04,0,0,1,.065-1A4.292,4.292,0,0,0,.321.813.652.652,0,0,1,.953,0h9.093A.652.652,0,0,1,10.7.655V7.312l11.323,8.581a1.035,1.035,0,0,1,.5.214c.5.392.683,1.189.577,2.511-.067.843-.166,1.412-.231,1.788a3.452,3.452,0,0,0-.069.51s.031.032.111.1a.729.729,0,0,1,.216.8c-.151.423-.323.9-6.62,1.164h-.027m-2.555-4.212a3.557,3.557,0,0,1,3.133,2.882c1.719-.087,3.55-.239,4.484-.4a2.5,2.5,0,0,1,.043-1.072,16.813,16.813,0,0,0,.216-1.669,3.4,3.4,0,0,0-.066-1.321.653.653,0,0,1-.321-.129L9.653,8.155A.651.651,0,0,1,9.4,7.635V1.306H1.749a5.254,5.254,0,0,1-.267,2.861c.827.378.9,1.5.953,2.218a4.5,4.5,0,0,0,.069.633A5.453,5.453,0,0,0,3.811,9.043,1.74,1.74,0,0,1,5.5,8.969a1.952,1.952,0,0,1,1.156,1.786,1.171,1.171,0,0,1-.375.945.969.969,0,0,1-.52.22A7.958,7.958,0,0,0,6.512,13a6.807,6.807,0,0,1,3.025,4.141,6.449,6.449,0,0,1,4.384,1.636m8.089-1.608h0"
                                    transform="translate(0 -0.003)"
                                    fill="#fff"
                                  />
                                </svg>
                              </div>
                              <div>CA Native</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#1A6074] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24.259"
                                  height="24.707"
                                  viewBox="0 0 24.259 24.707"
                                >
                                  <path
                                    id="Union_7"
                                    data-name="Union 7"
                                    d="M-6039.733,16872.617l-1.245-2.674,8.712-8.418,1.3.643c.059-.068.105-.131.173-.2,1.453-1.457,4.862-1.621,4.862-1.621s-.165,3.408-1.618,4.861a2.705,2.705,0,0,1-2.66,1l-3,6.416a3.6,3.6,0,0,1-1.745,1.736,3.581,3.581,0,0,1-1.515.336A3.6,3.6,0,0,1-6039.733,16872.617Zm2.029-2.436a.947.947,0,0,0-.529,1.232l.873,2.193a.524.524,0,0,0,.487.33h.817a.525.525,0,0,0,.487-.33l.876-2.189,0,0a.983.983,0,0,0,.063-.348.951.951,0,0,0-.949-.953h-1.779A.985.985,0,0,0-6037.7,16870.182Zm-9.055,3.342a.48.48,0,0,1-.14-.357.49.49,0,0,1,.152-.352l22.073-21.332a.489.489,0,0,1,.348-.139h.008a.487.487,0,0,1,.352.152.5.5,0,0,1-.013.707l-22.073,21.332a.482.482,0,0,1-.345.141A.5.5,0,0,1-6046.759,16873.523Zm4.036-7.314a2.7,2.7,0,0,1-2.655-1c-1.457-1.453-1.622-4.861-1.622-4.861s3.409.164,4.862,1.621c.068.068.114.137.173.2l1.317-.656-.953-2.859h-1.651c-.093,0-.182,0-.275-.012a2.2,2.2,0,0,1-1.9-2.447l.563-4.512,0-.021a.763.763,0,0,1,.864-.646.759.759,0,0,1,.648.859l-.563,4.506a.538.538,0,0,0,0,.084.664.664,0,0,0,.665.666h1.144l-.432-1.287-.008-.031a.765.765,0,0,1,.5-.957.765.765,0,0,1,.957.5l.762,2.291.242.717,1.258-2.092-.657-1.957-.013-.047a.761.761,0,0,1,.513-.953.763.763,0,0,1,.953.514l.762,2.291a.759.759,0,0,1-.067.635l-2.113,3.52.216.648a8.848,8.848,0,0,1,3.659-.373l-6.747,6.518Zm7.132-9.453a.745.745,0,0,1-.072-.635l.767-2.291a.276.276,0,0,1,.017-.057.764.764,0,0,1,.983-.443.764.764,0,0,1,.449.986l-.652,1.957,1.084,1.8-1.131,1.1Zm8.047.2a2.195,2.195,0,0,1-1.711,1.656Zm-5.057.689.762-2.295a.764.764,0,0,1,.965-.482.765.765,0,0,1,.513.639l-2.253,2.178Zm3.02-5.775a.215.215,0,0,0,0-.025.764.764,0,0,1,.678-.844.768.768,0,0,1,.843.678l.178,1.436-1.372,1.326Z"
                                    transform="translate(6047.526 -16850.494)"
                                    fill="#fff"
                                    stroke="rgba(0,0,0,0)"
                                    strokeMiterlimit={10}
                                    strokeWidth={1}
                                  />
                                </svg>
                              </div>
                              <div>Deer Resistant</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-primary rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="19.714"
                                  height="20.165"
                                  viewBox="0 0 19.714 20.165"
                                >
                                  <g
                                    id="AdobeStock_499252910"
                                    transform="translate(-4.666 -4.032)"
                                  >
                                    <path
                                      id="Path_48940"
                                      data-name="Path 48940"
                                      d="M30.24,33.155a4.218,4.218,0,0,1,1.618-3.2.366.366,0,0,0,.09-.443l-.85-1.719a.359.359,0,0,0-.454-.177A5.365,5.365,0,0,0,27.538,32.3l-.875-1.193a.359.359,0,0,0-.544-.043L25.03,32.157a.363.363,0,0,0-.011.5,4.183,4.183,0,0,1,.627.926c.8,1.74.953,3.845-1.084,5.008a.362.362,0,0,0,.162.681h7.8a.363.363,0,0,0,.252-.616A7.764,7.764,0,0,1,30.24,33.155Z"
                                      transform="translate(-12.605 -15.072)"
                                      fill="#fff"
                                    />
                                    <path
                                      id="Path_48941"
                                      data-name="Path 48941"
                                      d="M22.758,6.028a5.237,5.237,0,0,0-6.2-.861,6.175,6.175,0,0,0-4.972-.973,6.129,6.129,0,0,0-3.8,2.954,4.808,4.808,0,0,0-1.5,8.106A4.5,4.5,0,0,0,12.663,19.5a3.867,3.867,0,0,0-.782-1.43,1.076,1.076,0,0,1,.036-1.488l1.088-1.088a1.079,1.079,0,0,1,1.538.011,5.728,5.728,0,0,1,3.232-3.624,1.081,1.081,0,0,1,1.365.53s.807,1.636.847,1.715a1.085,1.085,0,0,1-.27,1.315,3.512,3.512,0,0,0-1.362,2.655c0,.1,0,.2,0,.3a4.612,4.612,0,0,0,2.774.043,4.556,4.556,0,0,0,2.691-6.474,4.924,4.924,0,0,0-1.063-5.93Z"
                                      fill="#fff"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div>Under Oaks</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#3B5697] rounded-sm flex items-center justify-center">
                                <svg
                                  id="Group_5416"
                                  data-name="Group 5416"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="19.096"
                                  height="20.844"
                                  viewBox="0 0 19.096 20.844"
                                >
                                  <defs>
                                    <clipPath id="clip-path">
                                      <rect
                                        id="Rectangle_18532"
                                        data-name="Rectangle 18532"
                                        width="19.096"
                                        height="20.844"
                                        fill="#fff"
                                      />
                                    </clipPath>
                                  </defs>
                                  <g
                                    id="Group_5415"
                                    data-name="Group 5415"
                                    clipPath="url(#clip-path)"
                                  >
                                    <path
                                      id="Union_8"
                                      data-name="Union 8"
                                      d="M-6046.552,16750.139a2.058,2.058,0,0,1-.723-2.582,3.242,3.242,0,0,1,2.762-1.977,2.854,2.854,0,0,1,.681.029.246.246,0,0,0,.067.006h.055a.326.326,0,0,1,.042-.01h.013c.017,0,.038,0,.055-.008s.008,0,.017,0a.3.3,0,0,0,.038-.014.185.185,0,0,1,.021,0l.029-.012a.027.027,0,0,0,.021-.01l.034-.012a.1.1,0,0,1,.021-.012.1.1,0,0,1,.029-.014.1.1,0,0,1,.021-.012.239.239,0,0,1,.025-.018l.021-.012a.077.077,0,0,1,.025-.021.084.084,0,0,0,.021-.018c.008,0,.017-.012.025-.016a.049.049,0,0,1,.017-.018l.025-.025a.045.045,0,0,0,.017-.018l.025-.023a.045.045,0,0,1,.017-.018.126.126,0,0,1,.021-.029c0-.008.013-.014.017-.021s.012-.021.021-.029a.137.137,0,0,1,.012-.018c.013-.016.021-.037.034-.055a3.974,3.974,0,0,1,.24-.365,3.447,3.447,0,0,1,.231-.277.045.045,0,0,0,.012-.018,4.878,4.878,0,0,1,3.561-1.445,4.69,4.69,0,0,1,3.9,1.867.659.659,0,0,0,.067.084.014.014,0,0,0,0,.008.184.184,0,0,1,.029.029l.009.008a.229.229,0,0,0,.029.031l.008.008c.008.008.021.016.034.025a.009.009,0,0,0,.008.008l.03.025a.016.016,0,0,1,.008,0,.252.252,0,0,1,.034.025s.008,0,.012,0l.034.021s.009,0,.013,0a.117.117,0,0,0,.029.018.034.034,0,0,0,.017.008l.029.012c.008.006.013.006.017.01a.11.11,0,0,0,.029.008c.008,0,.017,0,.021.008a.086.086,0,0,1,.029.01.209.209,0,0,0,.021,0,.058.058,0,0,0,.025,0c.008,0,.017,0,.025,0s.017,0,.025,0,.017,0,.025,0h.025a.039.039,0,0,1,.025.006h.038a5.372,5.372,0,0,1,1.555.23l.063.025a3.869,3.869,0,0,1,.5.193.787.787,0,0,1,.084.037c.029.014.059.029.092.047a.645.645,0,0,1,.088.047c.084.041.164.092.244.139a1.045,1.045,0,0,1,.105.066.248.248,0,0,0,.05.033c.092.064.185.131.269.2a1.164,1.164,0,0,1,.1.08c.067.059.135.117.193.176a0,0,0,0,1,0,0,3.21,3.21,0,0,1,.693,1.014,2.064,2.064,0,0,1-.706,2.506c-1.1.785-3.334,1.727-7.694,1.727C-6043.079,16751.84-6045.378,16750.92-6046.552,16750.139Zm4.368-1.051a.985.985,0,0,0,.984.982.986.986,0,0,0,.988-.982.986.986,0,0,0-.988-.984A.985.985,0,0,0-6042.184,16749.088Zm4.995-.641a.8.8,0,0,0,.794.8.8.8,0,0,0,.8-.8.793.793,0,0,0-.8-.793A.793.793,0,0,0-6037.189,16748.447Zm-7.849-1.121a.53.53,0,0,0,.525.529.53.53,0,0,0,.53-.529.528.528,0,0,0-.53-.531A.527.527,0,0,0-6045.038,16747.326Zm11.36-.1a.532.532,0,0,0,.529.529.529.529,0,0,0,.53-.529.527.527,0,0,0-.53-.529A.529.529,0,0,0-6033.678,16747.225Zm-5.739-.164a.589.589,0,0,0,.588.594.592.592,0,0,0,.589-.594.586.586,0,0,0-.589-.584A.583.583,0,0,0-6039.417,16747.061Zm1.694-1.6a.408.408,0,0,0,.4.408.409.409,0,0,0,.408-.408.409.409,0,0,0-.408-.408A.408.408,0,0,0-6037.723,16745.463Zm-3.023-.408a.4.4,0,0,0,.4.408.4.4,0,0,0,.408-.408.409.409,0,0,0-.408-.408A.408.408,0,0,0-6040.746,16745.055Zm2.1-2.867c-.172,0-.34.01-.508.021.046-2.279.1-1.922.126-3.182a2.123,2.123,0,0,0-.467-1.389,2.778,2.778,0,0,0-.24-.27,19.306,19.306,0,0,1-2.938.572c-4.616.094-5.915-5.406-6.163-6.734a.173.173,0,0,1,.231-.2,2.74,2.74,0,0,0,1.232.213c5.705-.852,7.639,3.012,8.261,5.314a2.922,2.922,0,0,1,.546.893.06.06,0,0,0,.1,0,3.638,3.638,0,0,1,.492-.707c.563-1.963,2.236-5.1,6.979-4.385a2.294,2.294,0,0,0,1.047-.186.15.15,0,0,1,.2.168c-.21,1.131-1.316,5.8-5.234,5.723-1.333-.025-1.934-.508-2.6-.488-.017,0-.033,0-.05,0a1.54,1.54,0,0,0-.118.182,2.067,2.067,0,0,0-.282,1.113c.021,1.189.084,1.006.135,3.381A6.487,6.487,0,0,0-6038.648,16742.188Zm3.809-8a7.751,7.751,0,0,0-2.505,2.414l.055.1a17.678,17.678,0,0,1,2.993-2.193,19.507,19.507,0,0,1,3.452-1.543A9.289,9.289,0,0,0-6034.839,16734.188Zm-8.648-.412a17.035,17.035,0,0,1,3.637,2.688.385.385,0,0,1,.059-.061,8.989,8.989,0,0,0-3.052-3,11.314,11.314,0,0,0-4.7-1.445A23.754,23.754,0,0,1-6043.487,16733.775Z"
                                      transform="translate(6048.842 -16730.996)"
                                      fill="#fff"
                                      stroke="rgba(0,0,0,0)"
                                      strokeMiterlimit={10}
                                      strokeWidth={1}
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div>Clay Tolerant</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#634B91] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23.457"
                                  height="22.637"
                                  viewBox="0 0 23.457 22.637"
                                >
                                  <path
                                    id="Subtraction_2"
                                    data-name="Subtraction 2"
                                    d="M-12702.728,34075.867h-.1a4.958,4.958,0,0,1-3.771-1.828,4.915,4.915,0,0,1-3.771,1.828h-.1a4.935,4.935,0,0,1-1.565-.273,4.878,4.878,0,0,1-2.806-2.492,4.878,4.878,0,0,1-.222-3.758,4.392,4.392,0,0,1,.419-.9,4.912,4.912,0,0,1-2.29-1.777,4.879,4.879,0,0,1-.891-2.824,4.919,4.919,0,0,1,4.908-4.918,4.782,4.782,0,0,1,1.4.215,4.976,4.976,0,0,1,.992-2.945,4.912,4.912,0,0,1,2.616-1.785,5.041,5.041,0,0,1,1.3-.18h.018a5,5,0,0,1,2.945.992,4.883,4.883,0,0,1,1.783,2.617,5.242,5.242,0,0,1,.18,1.3,4.658,4.658,0,0,1,1.395-.215,4.924,4.924,0,0,1,4.917,4.918,4.869,4.869,0,0,1-.895,2.824,4.909,4.909,0,0,1-2.287,1.777,4.738,4.738,0,0,1,.419.9,4.868,4.868,0,0,1-.221,3.75,4.876,4.876,0,0,1-2.807,2.5A5.007,5.007,0,0,1-12702.728,34075.867Zm-4.311-16.316a1,1,0,0,0-1,1v6.68l6.3,2.078a.73.73,0,0,0,.308.051,1,1,0,0,0,.949-.684.967.967,0,0,0-.047-.746,1.018,1.018,0,0,0-.586-.52l-4.926-1.625v-5.234A1,1,0,0,0-12707.038,34059.551Z"
                                    transform="translate(12718.33 -34053.73)"
                                    fill="#fff"
                                    stroke="rgba(0,0,0,0)"
                                    strokeMiterlimit={10}
                                    strokeWidth={1}
                                  />
                                </svg>
                              </div>
                              <div>Long Blooming</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#1A6074] rounded-sm flex items-center justify-center">
                                <svg
                                  id="Group_5414"
                                  data-name="Group 5414"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="18.47"
                                  height="21.963"
                                  viewBox="0 0 18.47 21.963"
                                >
                                  <defs>
                                    <clipPath id="clip-path">
                                      <rect
                                        id="Rectangle_18531"
                                        data-name="Rectangle 18531"
                                        width="18.47"
                                        height="21.963"
                                        fill="#fff"
                                      />
                                    </clipPath>
                                  </defs>
                                  <rect
                                    id="Rectangle_18530"
                                    data-name="Rectangle 18530"
                                    width="1.676"
                                    height="1.87"
                                    transform="translate(8.397 20.093)"
                                    fill="#fff"
                                  />
                                  <g id="Group_5413" data-name="Group 5413">
                                    <g
                                      id="Group_5412"
                                      data-name="Group 5412"
                                      clipPath="url(#clip-path)"
                                    >
                                      <path
                                        id="Path_48843"
                                        data-name="Path 48843"
                                        d="M5.764,13.441A34.05,34.05,0,0,1,1.807,12.8a31.516,31.516,0,0,0,5.184-5.21,28.006,28.006,0,0,1-3.866-.584A25.169,25.169,0,0,0,9.235,0a25.171,25.171,0,0,0,6.11,7.006,28.01,28.01,0,0,1-3.866.584,31.517,31.517,0,0,0,5.184,5.21,34.049,34.049,0,0,1-3.957.642,39.431,39.431,0,0,0,5.764,5.632,42.334,42.334,0,0,1-18.47,0,39.428,39.428,0,0,0,5.764-5.632"
                                        transform="translate(0 0.001)"
                                        fill="#fff"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <div>Evergreen</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#3B5697] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="25.103"
                                  height="25.093"
                                  viewBox="0 0 25.103 25.093"
                                >
                                  <path
                                    id="Path_48979"
                                    data-name="Path 48979"
                                    d="M10.726,14.615C13.252,7.648,10.883,2.233,6.282,0q2.3,5.428-3.654,11.06c-4.84,4.316-2.669,12.689,3.851,13.627q-4.963-7.069.691-11.159c-3.075,8.459,3.293,4.544,2.37,11.258,5.816-2.107,6.686-7.084,3.142-14.819-.122,2.174-.6,3.76-1.957,4.648"
                                    transform="translate(4.203)"
                                    fill="#fff"
                                    fillRule="evenodd"
                                  />
                                  <g
                                    id="Group_5549"
                                    data-name="Group 5549"
                                    transform="translate(-3.949 -6.1)"
                                  >
                                    <g
                                      id="Rectangle_18560"
                                      data-name="Rectangle 18560"
                                      transform="matrix(0.695, 0.719, -0.719, 0.695, 26.967, 6.806)"
                                      fill="#fff"
                                      stroke="#3b5697"
                                      strokeWidth={1}
                                    >
                                      <rect
                                        width={3}
                                        height={32}
                                        rx="1.5"
                                        stroke="none"
                                      />
                                      <rect
                                        x="0.5"
                                        y="0.5"
                                        width={2}
                                        height={31}
                                        rx={1}
                                        fill="none"
                                      />
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <div>Fire Resistant</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#9F2D3C] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26.515"
                                  height="24.387"
                                  viewBox="0 0 26.515 24.387"
                                >
                                  <g
                                    id="Group_5409"
                                    data-name="Group 5409"
                                    transform="translate(9.899 1.512)"
                                  >
                                    <g
                                      id="AdobeStock_380205216"
                                      transform="translate(-7.437 0.916)"
                                    >
                                      <path
                                        id="Path_48980"
                                        data-name="Path 48980"
                                        d="M32.383,38.641a6.921,6.921,0,0,1,1.333,1.288v.005a3.409,3.409,0,0,1-1.669.256c.065-.321.135-.661.2-.982.22-.135.1-.416.1-.416Z"
                                        transform="translate(-25.22 -21.283)"
                                        fill="#fff"
                                      />
                                      <path
                                        id="Path_48981"
                                        data-name="Path 48981"
                                        d="M40.1,38.821c.165-.16.691-.14,1.3-.055.025.366.06.8.1,1.318-.646-.06-1.1-.12-1.1-.12-.366-.19-.085-.346-.085-.346-.21-.271-.09-.316-.09-.316C39.8,39.1,40.1,38.821,40.1,38.821Z"
                                        transform="translate(-36.989 -21.314)"
                                        fill="#fff"
                                      />
                                      <path
                                        id="Path_48982"
                                        data-name="Path 48982"
                                        d="M43.445,28.045c-1.2-.025-.932-1.233-.932-1.233.035-.651,1.067-.787,1.208-.8a18.439,18.439,0,0,0,.717,2.335.934.934,0,0,1-.521-.15A.875.875,0,0,0,43.445,28.045Z"
                                        transform="translate(-41.173 -14.982)"
                                        fill="#fff"
                                      />
                                      <path
                                        id="Path_48983"
                                        data-name="Path 48983"
                                        d="M6.165,11.742c-.09,4.134-.982,5.377-.982,5.377C3.915,20.035,2.191,20.932,1,21.177a4.012,4.012,0,0,0,.205-.727,11.947,11.947,0,0,0-.155-3.868c.841-2.46-.08-4.464.391-7.12C2.2,5.128,4.085,4.487,4.085,4.487c2.375-1.258,5.918.251,7.19.877a.232.232,0,0,1-.04.431c-1.714.486-2.581,0-3.693.5C5.047,7.413,6.2,9.768,6.165,11.742Z"
                                        transform="translate(12.648 -4.001)"
                                        fill="#fff"
                                      />
                                      <path
                                        id="Path_48984"
                                        data-name="Path 48984"
                                        d="M22.53,9.319a.35.35,0,0,1,.241-.107,1.72,1.72,0,0,1,.75.118,6.576,6.576,0,0,1,4.239,2.109s1.11-.592,1.57.117a.3.3,0,0,1,.035.082c.047.179.139.828-.766,1.217-.509.211.073,1.279.629,1.582a7.888,7.888,0,0,0,2.662.933c3.235.573,4.011,4.325,3.64,7.6,0,0-.336,1.983-1.936,2.4,0,0-.836.552-.122,1.092,0,0,.443.309-.015.336,0,0,.216.43-.092.3,0,0-.122.147-.284-.3,0,0-.269-.5-.4-.082,0,0-.03.2-.264.1,0,0-.052.612-.274.632,0,0-.167.117-.2-.525a1.956,1.956,0,0,1-.21.435.173.173,0,0,1-.237.039c-.1-.077-.218-.247-.143-.634,0,0-.43.117-.453.453,0,0-.453.316-.358-.537,0,0-.525-.2.022-.43,0,0,1.217-.542.764-.863,0,0-.256-.851-2.346-2.306,0,0-.567,2.876-.754,3.523,0,0-.361.98-.709,1.042,0,0-.273.055-.408-.44a.237.237,0,0,0-.207-.174.649.649,0,0,0-.427.147.989.989,0,0,1-.483.194c-.254.02-.54,0-.281-.279,0,0-.378-.134-.174-.291,0,0-.5-.321-.04-.358a2.062,2.062,0,0,0,1.095-.124.7.7,0,0,1,.488-.221.137.137,0,0,0,.134-.142,29.712,29.712,0,0,0-.4-3.938s-2.227-4.831-1.7-6.391a1.282,1.282,0,0,0-.565-1.284s-2.535-1.274-2-3.222A1.324,1.324,0,0,1,22.53,9.319ZM24.8,11.355c.305.351.939.114.939.114a.9.9,0,0,0-.113-.77c-.328-.464-1.052-.192-1.052-.192A1.29,1.29,0,0,0,24.8,11.355Z"
                                        transform="translate(-22.169 -6.6)"
                                        fill="#fff"
                                      />
                                      <circle
                                        id="Ellipse_50"
                                        data-name="Ellipse 50"
                                        cx="0.235"
                                        cy="0.235"
                                        r="0.235"
                                        transform="translate(2.763 4.148)"
                                        fill="#fff"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Rectangle_18562"
                                    data-name="Rectangle 18562"
                                    transform="matrix(0.695, 0.719, -0.719, 0.695, 23.019, 0)"
                                    fill="#fff"
                                    stroke="#9c331c"
                                    strokeWidth={1}
                                  >
                                    <rect
                                      width={3}
                                      height={32}
                                      rx="1.5"
                                      stroke="none"
                                    />
                                    <rect
                                      x="0.5"
                                      y="0.5"
                                      width={2}
                                      height={31}
                                      rx={1}
                                      fill="none"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div>Gopher Resistant</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-primary rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={27}
                                  height="22.305"
                                  viewBox="0 0 27 22.305"
                                >
                                  <path
                                    id="Union_6"
                                    data-name="Union 6"
                                    d="M-2456.2,15312.23h10.364l-5.188,10.856Zm11.26-.088,5.722-2.462-10.764,12.825Zm-17.8-2.458,5.649,2.458,5.018,10.333Zm6.43,1.777,1.034-4.111h8.526l1.035,4.111Zm10.322-4.242,3.876-1.238,2.949,2.812-5.8,2.519Zm-16.809,1.573,2.888-2.808,3.872,1.234-1.027,4.092Zm7.284-2.216-3.7-1.184,3.592-1.258h9.21l3.592,1.258-3.7,1.184Z"
                                    transform="translate(2464.485 -15303.636)"
                                    fill="#fff"
                                    stroke="rgba(0,0,0,0)"
                                    strokeMiterlimit={10}
                                    strokeWidth={1}
                                  />
                                </svg>
                              </div>
                              <div>Indestructible</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>Uses</div>
                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>
                    <div className="mb-[30px]" x-show="open">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[30px] text-default-text">
                        <div className="col-span-1">
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-primary rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width={12}
                                  height="25.709"
                                  viewBox="0 0 12 25.709"
                                >
                                  <path
                                    id="Path_48847"
                                    data-name="Path 48847"
                                    d="M1.163,21.994l.719,6.476a.429.429,0,0,0,.427.381h7.714a.429.429,0,0,0,.426-.381l.72-6.476Z"
                                    transform="translate(-0.166 -3.142)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48848"
                                    data-name="Path 48848"
                                    d="M.429,17.995H11.571A.429.429,0,0,0,12,17.566V14.138a.429.429,0,0,0-.429-.429H6.429V12.7A8.556,8.556,0,0,0,8.16,11.567a2.557,2.557,0,0,0,1.269.34,2.593,2.593,0,0,0,.669-.088,2.552,2.552,0,0,0,1.561-1.2h0c.647-1.122.18-4.328.125-4.69a.424.424,0,0,0-.209-.306.429.429,0,0,0-.37-.028c-.34.133-3.352,1.331-4,2.454a2.545,2.545,0,0,0,.249,2.919L7.2,11.22a8.049,8.049,0,0,1-.775.506V4.58a2.649,2.649,0,0,0,.857-2.228A3.544,3.544,0,0,0,6.3.122a.439.439,0,0,0-.608,0,3.55,3.55,0,0,0-.981,2.23A2.648,2.648,0,0,0,5.571,4.58V8.726A8.049,8.049,0,0,1,4.8,8.22l-.251-.251a2.547,2.547,0,0,0,.249-2.919c-.648-1.123-3.66-2.321-4-2.454a.433.433,0,0,0-.37.028.424.424,0,0,0-.209.306C.159,3.292-.307,6.5.339,7.62h0A2.556,2.556,0,0,0,1.9,8.819a2.588,2.588,0,0,0,.669.088,2.559,2.559,0,0,0,1.269-.34A8.533,8.533,0,0,0,5.571,9.7v4.011H.429A.429.429,0,0,0,0,14.138v3.429a.429.429,0,0,0,.429.429"
                                    transform="translate(0 0)"
                                    fill="#fff"
                                  />
                                </svg>
                              </div>
                              <div>Great for Containers</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#9C331C] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  width="30.249"
                                  height="24.79"
                                  viewBox="0 0 30.249 24.79"
                                >
                                  <path
                                    id="Path_48957"
                                    data-name="Path 48957"
                                    d="M29.761,13.5c-6.338-.009-6.524.987-12.607,1.045V12.375A5.34,5.34,0,0,0,22,7.065a.485.485,0,0,0-.485-.485,5.328,5.328,0,0,0-4.364,2.277V7.528A5.335,5.335,0,0,0,17.012.142a.485.485,0,0,0-.686,0,5.335,5.335,0,0,0-.142,7.386v1.33A5.328,5.328,0,0,0,11.82,6.581a.485.485,0,0,0-.485.485,5.34,5.34,0,0,0,4.849,5.309v2.169C10.1,14.486,9.915,13.491,3.577,13.5a.485.485,0,0,0,0,.97,34.924,34.924,0,0,1,6.469.517,36.124,36.124,0,0,0,6.623.53,36.124,36.124,0,0,0,6.623-.53,34.924,34.924,0,0,1,6.469-.517.485.485,0,0,0,0-.97"
                                    transform="translate(-1.597 0)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48958"
                                    data-name="Path 48958"
                                    d="M47.443,13.717v1.888h.845V13.717a4.651,4.651,0,0,0,4.224-4.625.423.423,0,0,0-.423-.422,4.642,4.642,0,0,0-3.8,1.983V9.495a4.647,4.647,0,0,0-.124-6.433.422.422,0,0,0-.6,0,4.648,4.648,0,0,0-.124,6.433v1.158a4.642,4.642,0,0,0-3.8-1.983.422.422,0,0,0-.422.422,4.651,4.651,0,0,0,4.224,4.625"
                                    transform="translate(-22.263 -1.513)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48959"
                                    data-name="Path 48959"
                                    d="M51.59,29.062h0"
                                    transform="translate(-26.575 -14.97)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48960"
                                    data-name="Path 48960"
                                    d="M4.224,13.717v1.888h.845V13.717A4.651,4.651,0,0,0,9.293,9.092.423.423,0,0,0,8.87,8.67a4.642,4.642,0,0,0-3.8,1.983V9.495a4.647,4.647,0,0,0-.124-6.433.422.422,0,0,0-.6,0,4.647,4.647,0,0,0-.124,6.433v1.158A4.642,4.642,0,0,0,.422,8.67.422.422,0,0,0,0,9.092a4.651,4.651,0,0,0,4.224,4.625"
                                    transform="translate(0 -1.513)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48961"
                                    data-name="Path 48961"
                                    d="M8.371,29.062h0"
                                    transform="translate(-4.312 -14.97)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48962"
                                    data-name="Path 48962"
                                    d="M29.752,31.84a36.124,36.124,0,0,0-6.623.53,34.881,34.881,0,0,1-6.469.517,34.881,34.881,0,0,1-6.469-.517,36.124,36.124,0,0,0-6.623-.53.485.485,0,1,0,0,.97,34.925,34.925,0,0,1,6.469.517,36.124,36.124,0,0,0,6.623.53,36.124,36.124,0,0,0,6.623-.53,34.925,34.925,0,0,1,6.469-.517.485.485,0,0,0,0-.97"
                                    transform="translate(-1.589 -16.401)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48963"
                                    data-name="Path 48963"
                                    d="M39.386,40.59a.485.485,0,0,0,0,.97.485.485,0,0,0,0-.97"
                                    transform="translate(-20.043 -20.909)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48964"
                                    data-name="Path 48964"
                                    d="M21.1,40.082a.485.485,0,0,0-.97,0,.485.485,0,0,0,.97,0"
                                    transform="translate(-10.369 -20.401)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48965"
                                    data-name="Path 48965"
                                    d="M7.054,38.382a.485.485,0,0,0-.97,0,.485.485,0,0,0,.97,0"
                                    transform="translate(-3.134 -19.525)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48966"
                                    data-name="Path 48966"
                                    d="M39.434,49.632a.485.485,0,0,0,.97,0,.485.485,0,0,0-.97,0"
                                    transform="translate(-20.313 -25.32)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48967"
                                    data-name="Path 48967"
                                    d="M19.724,49.632a.485.485,0,0,0,.97,0,.485.485,0,0,0-.97,0"
                                    transform="translate(-10.16 -25.32)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48968"
                                    data-name="Path 48968"
                                    d="M55.054,37.492a.485.485,0,0,0-.97,0,.485.485,0,0,0,.97,0"
                                    transform="translate(-27.86 -19.067)"
                                    fill="#fff"
                                  />
                                </svg>
                              </div>
                              <div>Groundcover</div>
                            </div>
                          </div>
                          <div className="col-span-1 border-t border-gray-border first:border-t-0">
                            <div className="flex flex-wrap items-center gap-[20px] px-[5px] py-[10px] mb-[20px] last:mb-0">
                              <div className="w-[35px] h-[35px] bg-[#694D84] rounded-sm flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12.88"
                                  height="18.17"
                                  viewBox="0 0 12.88 18.17"
                                >
                                  <path
                                    id="Path_48726"
                                    data-name="Path 48726"
                                    d="M15.793,46.387a1.431,1.431,0,0,1-1.946.513,1.526,1.526,0,1,1,1.946-.513Zm2.1-3.455-.888-1.313-.417.014H16.5a2.775,2.775,0,0,1-.462-.04l-.638.947a3.2,3.2,0,0,0-3.01,1.467,3.016,3.016,0,0,0,.567,4.207,3.017,3.017,0,0,0,4.11-1.055,3.229,3.229,0,0,0,.23-3.344Z"
                                    transform="translate(-11.8 -30.496)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48727"
                                    data-name="Path 48727"
                                    d="M41.6,5.675s0,.006,0,.009l-2.573,6.082A2.081,2.081,0,0,1,37.8,12.917L35.7,9.8l4.853-7.2a.282.282,0,0,1,.233-.125.3.3,0,0,1,.235.119l.247.349A2.9,2.9,0,0,1,41.6,5.675Z"
                                    transform="translate(-28.923 -2.473)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="Path_48728"
                                    data-name="Path 48728"
                                    d="M22.629,18.877a1.526,1.526,0,0,1-1.691-2.51,1.526,1.526,0,0,1,1.691,2.51Zm1.452-2.893a3.207,3.207,0,0,0-3.01-1.467L13.042,2.6a.282.282,0,0,0-.233-.125.3.3,0,0,0-.235.119l-.247.349A2.91,2.91,0,0,0,12,5.684l2.573,6.082a2.1,2.1,0,0,0,2,1.276l.732-.026,1.872,2.774c-1.535,2.715,1.844,6.085,4.34,4.4A3.015,3.015,0,0,0,24.082,15.984Zm-5.651-2.976a.365.365,0,1,1,.366-.363A.364.364,0,0,1,18.431,13.008Z"
                                    transform="translate(-11.797 -2.473)"
                                    fill="#fff"
                                  />
                                </svg>
                              </div>
                              <div>Plants for Cutting</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>100% Guarantee</div>
                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>
                    <div className="mb-[30px] text-normal-text" x-show="open">
                      <div className="mb-[30px] leading-[32px]">
                        We offer a 100% unconditional guarantee for all our
                        perennials to reach you in good condition and to grow.
                        If you're not satisfied, we'll reship or refund
                        immediately. Please don't hesitate to contact us if you
                        have questions or concerns—we share your passion for
                        gardening and want your new plants to thrive in your
                        border!
                      </div>
                      <div className="rounded-tl-lg rounded-br-lg overflow-hidden">
                        <img
                          src="images/100-guarantee.jpg"
                          className="max-h-full"
                          alt
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-title-text font-sub font-semibold flex items-center justify-between mb-[20px] pt-[20px] border-t border-gray-border cursor-pointer">
                      <div>Reviews</div>
                      <div>
                        <span
                          className="material-icons-outlined"
                          x-html="open == true ? 'remove' : 'add'"
                        >
                          remove
                        </span>
                      </div>
                    </div>
                    <div className="mb-[30px] text-default-text" x-show="open">
                      <div>
                        <div className="flex flex-wrap items-center mx-[-15px] mb-[15px]">
                          <div className="w-1/2 px-[15px]">
                            <div className="flex flex-wrap items-end mb-[10px]">
                              <div className="font-sub font-bold text-2xl-text">
                                4.7
                              </div>
                              <div className="text-normal-text font-semibold ml-[10px]">
                                Out Of 5
                              </div>
                            </div>
                            <div className="mb-[10px]">
                              <span className="material-icons-outlined text-[#FFC607] text-[26px] leading-none tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] text-[26px] leading-none tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] text-[26px] leading-none tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] text-[26px] leading-none tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] text-[26px] leading-none tracking-normal">
                                star_border
                              </span>
                            </div>
                            <div>
                              <a
                                href="javascript:void(0);"
                                className="text-normal-text font-semibold"
                              >
                                See all 30 reviews
                              </a>
                            </div>
                          </div>
                          <div className="w-1/2 px-[15px] text-right">
                            <a
                              href="javascript:void(0)"
                              className="btn btn-sm btn-primary uppercase !font-body !rounded-xs whitespace-nowrap"
                            >
                              <span className="material-icons-outlined align-middle">
                                drive_file_rename_outline
                              </span>
                              <span className="text-[12px]">
                                Write a review
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[30px]">
                          <div className="w-full md:w-6/12 px-[15px]">
                            <div className="font-bold font-sub mb-[30px]">
                              Select a row below to filter reviews.
                            </div>
                            <div className="flex items-center justify-between mx-[-15px] mb-[30px]">
                              <div className="px-[15px]">5 Star</div>
                              <div className="grow px-[15px]">
                                <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
                                  <div
                                    className="bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0"
                                    style={{ right: "50%" }}
                                  />
                                </div>
                              </div>
                              <div className="px-[15px] text-right w-[50px]">
                                10
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-15px] mb-[30px]">
                              <div className="px-[15px]">4 Star</div>
                              <div className="grow px-[15px]">
                                <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
                                  <div
                                    className="bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0"
                                    style={{ right: "40%" }}
                                  />
                                </div>
                              </div>
                              <div className="px-[15px] text-right w-[50px]">
                                5
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-15px] mb-[30px]">
                              <div className="px-[15px]">3 Star</div>
                              <div className="grow px-[15px]">
                                <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
                                  <div
                                    className="bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0"
                                    style={{ right: "60%" }}
                                  />
                                </div>
                              </div>
                              <div className="px-[15px] text-right w-[50px]">
                                8
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-15px] mb-[30px]">
                              <div className="px-[15px]">2 Star</div>
                              <div className="grow px-[15px]">
                                <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
                                  <div
                                    className="bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0"
                                    style={{ right: "90%" }}
                                  />
                                </div>
                              </div>
                              <div className="px-[15px] text-right w-[50px]">
                                1
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-15px] mb-[30px]">
                              <div className="px-[15px]">1 Star</div>
                              <div className="grow px-[15px]">
                                <div className="bg-[#EEC9C3] h-[10px] w-full overflow-hidden relative">
                                  <div
                                    className="bg-[#A62152] absolute h-[10px] top-0 bottom-0 left-0"
                                    style={{ right: "44%" }}
                                  />
                                </div>
                              </div>
                              <div className="px-[15px] text-right w-[50px]">
                                6
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-6/12 px-[15px]">
                            <div className="font-bold font-sub mb-[30px]">
                              Average Customer Ratings
                            </div>
                            <div className="flex items-center justify-between mx-[-5px] mb-[30px]">
                              <div className="px-[5px] w-[150px]">Overall</div>
                              <div className="grow px-[5px]">
                                <div className="text-default-text flex">
                                  <span className="material-icons-outlined text-[#FFC607] text-[20px] leading-none tracking-normal">
                                    star
                                  </span>
                                  <span className="material-icons-outlined text-[#FFC607] text-[20px] leading-none tracking-normal">
                                    star
                                  </span>
                                  <span className="material-icons-outlined text-[#FFC607] text-[20px] leading-none tracking-normal">
                                    star
                                  </span>
                                  <span className="material-icons-outlined text-[#FFC607] text-[20px] leading-none tracking-normal">
                                    star
                                  </span>
                                  <span className="material-icons-outlined text-[#FFC607] text-[20px] leading-none tracking-normal">
                                    star_border
                                  </span>
                                </div>
                              </div>
                              <div className="px-[5px] text-right w-[40px]">
                                4.5
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-5px] mb-[30px]">
                              <div className="px-[5px] w-[150px]">
                                Quality of Product
                              </div>
                              <div className="grow px-[5px]">
                                <div className="grid grid-cols-5 divide-x">
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                </div>
                              </div>
                              <div className="px-[5px] text-right w-[40px]">
                                4.5
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-5px] mb-[30px]">
                              <div className="px-[5px] w-[150px]">
                                Value of Product
                              </div>
                              <div className="grow px-[5px]">
                                <div className="grid grid-cols-5 divide-x">
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                </div>
                              </div>
                              <div className="px-[5px] text-right w-[40px]">
                                3.9
                              </div>
                            </div>
                            <div className="flex items-center justify-between mx-[-5px] mb-[30px]">
                              <div className="px-[5px] w-[150px]">
                                Easy of Use
                              </div>
                              <div className="grow px-[5px]">
                                <div className="grid grid-cols-5 divide-x">
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#A62152] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                  <div className="bg-[#EEC9C3] h-[10px]">
                                    &nbsp;
                                  </div>
                                </div>
                              </div>
                              <div className="px-[5px] text-right w-[40px]">
                                2.5
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap mx-[-15px] mb-[30px]">
                          <div className="w-full px-[15px]">
                            <div className="bg-[#EEF3FF] p-[10px] flex flex-wrap items-center justify-between rounded-[3px]">
                              <div className="font-bold extra-small-text">
                                1-5 OF 30 REVIEWS
                              </div>
                              <div className="py-2 sm:py-0">
                                <div
                                  x-data="{ open: false, selected: 0 }"
                                  className="relative inline-block text-left z-10"
                                >
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="group inline-flex items-center justify-between text-default-text bg-[#EEF3FF] w-[200px] px-2 py-3 leading-none"
                                      id="menu-button"
                                      x-ref="button"
                                      aria-expanded="false"
                                      aria-haspopup="true"
                                    >
                                      <span>
                                        <span>Sort by:</span>
                                        <span x-html="$refs.options.children[selected].children[1].innerHTML">
                                          Most Recent
                                        </span>
                                      </span>
                                      <span className="material-icons-outlined text-lg leading-none">
                                        expand_more
                                      </span>
                                    </button>
                                  </div>
                                  <div
                                    x-show="open"
                                    x-transition:enter="transition ease-out duration-100"
                                    x-transition:enter-start="transform opacity-0 scale-95"
                                    x-transition:enter-end="transform opacity-100 scale-100"
                                    x-transition:leave="transition ease-in duration-75"
                                    x-transition:leave-start="transform opacity-100 scale-100"
                                    x-transition:leave-end="transform opacity-0 scale-95"
                                    className="origin-top-right absolute right-0 mt-0 w-[200px] border border-primary bg-tertiary ring-1 ring-black ring-opacity-5 rounded-xs focus:outline-none"
                                    style={{ display: "none" }}
                                  >
                                    <div className="py-1" x-ref="options">
                                      <button
                                        type="button"
                                        className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                      >
                                        <span className="material-icons-outlined text-default-text text-default">
                                          check
                                        </span>{" "}
                                        <span>Most Recent</span>
                                      </button>{" "}
                                      <button
                                        type="button"
                                        className="w-full text-left px-2 py-1 text-default-text flex items-center gap-2 text-black"
                                      >
                                        <span className="material-icons-outlined text-default-text text-default opacity-0">
                                          check
                                        </span>{" "}
                                        <span>Oldest</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mx-[-15px] mb-[30px] last:mb-0">
                          <div className="flex flex-wrap justify-between mb-[10px]">
                            <div className="px-[15px] flex flex-wrap items-center">
                              <div className="text-normal-text font-sub font-bold">
                                <span className="text-default">
                                  Andrew Elder
                                </span>
                              </div>
                              <div className="px-[10px]">|</div>
                              <div className="text-default-text mr-[5px]">
                                <span className="text-[#90887F]">
                                  Verified Reviewer
                                </span>
                              </div>
                              <div>
                                <span className="material-icons text-default align-middle">
                                  check_circle
                                </span>
                              </div>
                            </div>
                            <div className="px-[15px] text-default-text">
                              <div className="text-[#90887F]">2 Days ago</div>
                            </div>
                          </div>
                          <div className="mb-[10px] px-[15px]">
                            <div className="text-default-text">
                              <span className="material-icons-outlined text-[#FFC607] tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] tracking-normal">
                                star
                              </span>
                              <span className="material-icons-outlined text-[#FFC607] tracking-normal">
                                star_border
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap justify-between mb-[15px]">
                            <div className="w-full px-[15px]">
                              <div className="text-medium-text font-bold font-sub mb-[10px]">
                                They are incredibly versatile, with their
                                ability
                              </div>
                              <div className="text-small-text mb-[15px]">
                                <div className="leading-7">
                                  As spring approaches summer, many a gardener
                                  begins thinking about summer blooming plants
                                  like flowering maples (Abutilon), Yarrows
                                  (Achillea), Snapdragons (Antirrhinum),
                                  Carnations (Dianthus) and Dahlias. This is
                                  however a great time to plant summer-blooming
                                  vines too. Vines, as a group, are generally
                                  one of the easiest plants to grow.
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap mb-[15px]">
                            <div className="px-[15px] mb-[15px] last:mb-0">
                              <img src="./images/review-img-1.jpg" />
                            </div>
                            <div className="px-[15px] mb-[15px] last:mb-0">
                              <img src="./images/review-img-2.jpg" />
                            </div>
                          </div>
                          <div className="text-default-text flex items-center flex-wrap mb-[15px] px-[15px]">
                            <span className="material-icons text-[#90887F] mr-[10px]">
                              thumb_up
                            </span>
                            <span className="text-[#90887F]">
                              I recommend this product
                            </span>
                          </div>
                          <div className="w-full px-[15px]">
                            <div className="text-default-text mb-[10px] font-sub">
                              Was this review helpful?
                            </div>
                            <div className="flex items-center divide-x divide-gray-border">
                              <div className="mb-[10px] text-default-text flex items-center px-[10px] first:pl-0">
                                <span className="material-icons text-[#90887F] mr-[10px]">
                                  thumb_up
                                </span>
                                <span className="text-[#90887F]">Yes (15)</span>
                              </div>
                              <div className="mb-[10px] text-default-text flex items-center px-[10px] first:pl-0">
                                <span className="material-icons text-[#90887F] mr-[10px]">
                                  thumb_down
                                </span>
                                <span className="text-[#90887F]">Yes (10)</span>
                              </div>
                              <div className="mb-[10px] text-default-text flex items-center px-[10px] first:pl-0">
                                <span className="material-icons text-[#90887F] mr-[10px]">
                                  outlined_flag
                                </span>
                                <span className="text-[#90887F]">Report</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center sm:text-left">
                          <a
                            href="javascript:void(0);"
                            className="btn btn-md btn-primary"
                          >
                            Load More Reviews
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShoppingCart;
