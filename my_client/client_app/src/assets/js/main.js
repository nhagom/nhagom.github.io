   /*--------------------------
        Latest Product Slider
    ----------------------------*/
    $(".latest-product__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*--------------------------
        Select
    ----------------------------*/
    $("select").niceSelect();

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });




    // Product
    window.onload = function () {
        khoiTao();

        // Thêm hình vào banner
        addBanner("../../assets/img/banners/banner0.gif", "../../assets/img/banners/banner0.gif");
        var numBanner = 9; // Số lượng hình banner
        for (var i = 1; i <= numBanner; i++) {
            var linkimg = "../../assets/img/banners/banner" + i + ".png";
            addBanner(linkimg, linkimg);
        }

        // Khởi động thư viện hỗ trợ banner - chỉ chạy khi đã tạo hình trong banner
        var owl = $('.owl-carousel');
        owl.owlCarousel({
            items: 1.5,
            margin: 100,
            center: true,
            loop: true,
            smartSpeed: 450,
            autoplay: true,
            autoplayTimeout: 3500
        });

        // autocomplete cho khung tim kiem
        autocomplete(document.getElementById('search-box'), list_products);

        // thêm tags (từ khóa) vào khung tìm kiếm
        var tags = ["Samsung", "iPhone", "Huawei", "Oppo", "Mobi"];
        for (var t of tags) addTags(t, "index.html?search=" + t);


        // Thêm sản phẩm vào trang
        var sanPhamPhanTich
        var sanPhamPhanTrang;

        var filters = getFilterFromURL();
        if (filters.length) { // có filter
            sanPhamPhanTich = phanTich_URL(filters, true);
            sanPhamPhanTrang = tinhToanPhanTrang(sanPhamPhanTich, filtersFromUrl.page || 1);
            if (!sanPhamPhanTrang.length) alertNotHaveProduct(false);
            else addProductsFrom(sanPhamPhanTrang);

            // hiển thị list sản phẩm
            document.getElementsByClassName('contain-products')[0].style.display = '';

        } else { // ko có filter : trang chính mặc định sẽ hiển thị các sp hot, ...
            var soLuong = (window.innerWidth < 1200 ? 4 : 5); // màn hình nhỏ thì hiển thị 4 sp, to thì hiển thị 5

            // Các màu
            var yellow_red = ['#ff9c00', '#ec1f1f'];
            var blue = ['#42bcf4', '#004c70'];
            var green = ['#5de272', '#007012'];

            // Thêm các khung sản phẩm
            var div = document.getElementsByClassName('contain-khungSanPham')[0];
            addKhungSanPham('NỔI BẬT NHẤT', yellow_red, ['star=3', 'sort=rateCount-decrease'], soLuong, div);
            addKhungSanPham('SẢN PHẨM MỚI', blue, ['promo=moiramat', 'sort=rateCount-decrease'], soLuong, div);
            addKhungSanPham('TRẢ GÓP 0%', yellow_red, ['promo=tragop', 'sort=rateCount-decrease'], soLuong, div);
            addKhungSanPham('GIÁ SỐC ONLINE', green, ['promo=giareonline', 'sort=rateCount-decrease'], soLuong, div);
            addKhungSanPham('GIẢM GIÁ LỚN', yellow_red, ['promo=giamgia'], soLuong, div);
            addKhungSanPham('GIÁ RẺ CHO MỌI NHÀ', green, ['price=0-3000000', 'sort=price'], soLuong, div);
        }

        // Thêm chọn mức giá
        addPricesRange(0, 2000000);
        addPricesRange(2000000, 4000000);
        addPricesRange(4000000, 7000000);
        addPricesRange(7000000, 13000000);
        addPricesRange(13000000, 0);


        // Thêm chọn sắp xếp
        addSortFilter('ascending', 'price', 'Giá tăng dần');
        addSortFilter('decrease', 'price', 'Giá giảm dần');
        addSortFilter('ascending', 'star', 'Sao tăng dần');
        addSortFilter('decrease', 'star', 'Sao giảm dần');
        addSortFilter('ascending', 'rateCount', 'Đánh giá tăng dần');
        addSortFilter('decrease', 'rateCount', 'Đánh giá giảm dần');
        addSortFilter('ascending', 'name', 'Tên A-Z');
        addSortFilter('decrease', 'name', 'Tên Z-A');

        // Thêm filter đã chọn
        addAllChoosedFilter();
    };

    var soLuongSanPhamMaxTrongMotTrang = 15;

    // =========== Đọc dữ liệu từ url ============
    var filtersFromUrl = { // Các bộ lọc tìm được trên url sẽ đc lưu vào đây
        search: '',
        price: '',
        promo: '',
        star: '',
        page: '',
        sort: {
            by: '',
            type: 'ascending'
        }
    }

    function getFilterFromURL() { // tách và trả về mảng bộ lọc trên url
        var fullLocation = window.location.href;
        fullLocation = decodeURIComponent(fullLocation);
        var dauHoi = fullLocation.split('?'); // tách theo dấu ?

        if (dauHoi[1]) {
            var dauVa = dauHoi[1].split('&');
            return dauVa;
        }

        return [];
    }

    function phanTich_URL(filters, saveFilter) {
        // var filters = getFilterFromURL();
        var result = copyObject(list_products);

        for (var i = 0; i < filters.length; i++) {
            var dauBang = filters[i].split('=');

            switch (dauBang[0]) {
                case 'search':
                    dauBang[1] = dauBang[1].split('+').join(' ');
                    result = timKiemTheoTen(result, dauBang[1]);
                    if (saveFilter) filtersFromUrl.search = dauBang[1];
                    break;

                case 'price':
                    if (saveFilter) filtersFromUrl.price = dauBang[1];

                    var prices = dauBang[1].split('-');
                    prices[1] = Number(prices[1]) || 1E10;
                    result = timKiemTheoGiaTien(result, prices[0], prices[1]);
                    break;


                case 'star':
                    result = timKiemTheoSoLuongSao(result, dauBang[1]);
                    if (saveFilter) filtersFromUrl.star = dauBang[1];
                    break;

                case 'promo':
                    result = timKiemTheoKhuyenMai(result, dauBang[1]);
                    if (saveFilter) filtersFromUrl.promo = dauBang[1];
                    break;

                case 'page': // page luôn ở cuối đường link
                    if (saveFilter) filtersFromUrl.page = dauBang[1];
                    break;

                case 'sort':
                    var s = dauBang[1].split('-');
                    var tenThanhPhanCanSort = s[0];

                    switch (tenThanhPhanCanSort) {
                        case 'price':
                            if (saveFilter) filtersFromUrl.sort.by = 'price';
                            result.sort(function (a, b) {
                                var giaA = parseInt(a.price.split('.').join(''));
                                var giaB = parseInt(b.price.split('.').join(''));
                                return giaA - giaB;
                            });
                            break;

                        case 'star':
                            if (saveFilter) filtersFromUrl.sort.by = 'star';
                            result.sort(function (a, b) {
                                return a.star - b.star;
                            });
                            break;

                        case 'rateCount':
                            if (saveFilter) filtersFromUrl.sort.by = 'rateCount';
                            result.sort(function (a, b) {
                                return a.rateCount - b.rateCount;
                            });
                            break;

                        case 'name':
                            if (saveFilter) filtersFromUrl.sort.by = 'name';
                            result.sort(function (a, b) {
                                return a.name.localeCompare(b.name);
                            });
                            break;
                    }

                    if (s[1] == 'decrease') {
                        if (saveFilter) filtersFromUrl.sort.type = 'decrease';
                        result.reverse();
                    }

                    break;
            }
        }

        return result;
    }



    // ======== TÌM KIẾM (Từ mảng list truyền vào, trả về 1 mảng kết quả) ============

    // function timKiemTheoTen(list, ten, soluong) {}
    // hàm Tìm-kiếm-theo-tên được đặt trong dungchung.js , do trang chitietsanpham cũng cần dùng tới nó

    function timKiemTheoSoLuongSao(list, soLuongSaoToiThieu, soluong) {
        var count, result = [];
        if (soluong < list.length) count = soluong;
        else count = list.length;

        for (var i = 0; i < list.length; i++) {
            if (list[i].star >= soLuongSaoToiThieu) {
                result.push(list[i]);
                count--;
                if (count <= 0) break;
            }
        }

        return result;
    }

    function timKiemTheoGiaTien(list, giaMin, giaMax, soluong) {
        var count, result = [];
        if (soluong < list.length) count = soluong;
        else count = list.length;

        for (var i = 0; i < list.length; i++) {
            var gia = parseInt(list[i].price.split('.').join(''));
            if (gia >= giaMin && gia <= giaMax) {
                result.push(list[i]);
                count--;
                if (count <= 0) break;
            }
        }

        return result;
    }

    function timKiemTheoKhuyenMai(list, tenKhuyenMai, soluong) {
        var count, result = [];
        if (soluong < list.length) count = soluong;
        else count = list.length;

        for (var i = 0; i < list.length; i++) {
            if (list[i].promo.name == tenKhuyenMai) {
                result.push(list[i]);
                count--;
                if (count <= 0) break;
            }
        }

        return result;
    }

    function timKiemTheoRAM(list, luongRam, soluong) {
        var count, result = [];
        if (soluong < list.length) count = soluong;
        else count = list.length;

        for (var i = 0; i < list.length; i++) {
            if (parseInt(list[i].detail.ram) == luongRam) {
                result.push(list[i]);
                count--;
                if (count <= 0) break;
            }
        }

        return result;
    }

    // ========== LỌC ===============
    // Thêm bộ lọc đã chọn vào html
    function addChoosedFilter(type, textInside) {
        var link = createLinkFilter('remove', type);
        var tag_a = `<a href="` + link + `"><h3>` + textInside + ` <i class="fa fa-close"></i> </h3></a>`;

        var divChoosedFilter = document.getElementsByClassName('choosedFilter')[0];
        divChoosedFilter.innerHTML += tag_a;

        var deleteAll = document.getElementById('deleteAllFilter');
        deleteAll.style.display = "block";
        deleteAll.href = window.location.href.split('?')[0];
    }

    // Thêm nhiều bộ lọc cùng lúc
    function addAllChoosedFilter() {
        // Thêm từ biến lưu giữ bộ lọc 'filtersFromUrl'

        if (filtersFromUrl.search != '')
            addChoosedFilter('search', '"' + filtersFromUrl.search + '"');

        if (filtersFromUrl.price != '') {
            var prices = filtersFromUrl.price.split('-');
            addChoosedFilter('price', priceToString(prices[0], prices[1]));
        }

        if (filtersFromUrl.promo != '')
            addChoosedFilter('promo', promoToString(filtersFromUrl.promo));

        if (filtersFromUrl.star != '')
            addChoosedFilter('star', starToString(filtersFromUrl.star));

        if (filtersFromUrl.sort.by != '') {
            var sortBy = sortToString(filtersFromUrl.sort.by);
            var kieuSapXep = (filtersFromUrl.sort.type == 'decrease' ? 'giảm dần' : 'tăng dần');
            addChoosedFilter('sort', sortBy + kieuSapXep);
        }
    }

    // Tạo link cho bộ lọc
    // type là 'add' hoặc 'remove',
    // tương ứng 'thêm' bộ lọc mới có giá trị = valueAdd, hoặc 'xóa' bộ lọc đã có
    function createLinkFilter(type, nameFilter, valueAdd) {
        var o = copyObject(filtersFromUrl);
        o.page = ''; // reset phân trang

        if (nameFilter == 'sort') {
            if (type == 'add') {
                o.sort.by = valueAdd.by;
                o.sort.type = valueAdd.type;

            } else if (type == 'remove') {
                o.sort.by = '';
            }

        } else {
            if (type == 'add') o[nameFilter] = valueAdd;
            else if (type == 'remove') o[nameFilter] = '';
        }

        var link = 'index.html'; //window.location.href.split('?')[0].replace('#', '');
        var h = false; // Đã có dấu hỏi hay chưa

        // thêm những filter trước sort
        for (var i in o) {
            if (i != 'sort' && o[i]) {
                link += (h ? '&' : '?') + i + '=' + o[i];
                h = true;
            }
        }

        // thêm sort (do sort trong filtersFromUrl là kiểu object, khác với kiểu string của những loại còn lại)
        // nên lúc tạo link sẽ khác những loại trên
        if (o.sort.by != '')
            link += (h ? '&' : '?') + 'sort=' + o.sort.by + '-' + o.sort.type;

        return link;
    }

    // Thông báo nếu không có sản phẩm
    function alertNotHaveProduct(coSanPham) {
        var thongbao = document.getElementById('khongCoSanPham');
        if (!coSanPham) {
            thongbao.style.width = "auto";
            thongbao.style.opacity = "1";
            thongbao.style.margin = "auto"; // Căn giữa
            thongbao.style.transitionDuration = "1s"; // hiện ra từ từ

        } else {
            thongbao.style.width = "0";
            thongbao.style.opacity = "0";
            thongbao.style.margin = "0";
            thongbao.style.transitionDuration = "0s"; // Ngay lâp tức biến mất
        }
    }

    // ========== Lọc TRONG TRANG ============

    // lọc theo tên
    function getNameFromLi(li) {
        var a = li.getElementsByTagName('a')[0];
        var h3 = a.getElementsByTagName('h3')[0];
        var name = h3.innerHTML;
        return name;
    }

    function filterProductsName(ele) {
        var filter = ele.value.toUpperCase();
        var listLi = getLiArray();
        var coSanPham = false;

        var soLuong = 0;

        for (var i = 0; i < listLi.length; i++) {
            if (getNameFromLi(listLi[i]).toUpperCase().indexOf(filter) > -1 &&
                soLuong < soLuongSanPhamMaxTrongMotTrang) {
                showLi(listLi[i]);
                coSanPham = true;
                soLuong++;

            } else {
                hideLi(listLi[i]);
            }
        }

        // Thông báo nếu không có sản phẩm
        alertNotHaveProduct(coSanPham);
    }

    // Thêm chọn mức giá
    function addPricesRange(min, max) {
        var text = priceToString(min, max);
        var link = createLinkFilter('add', 'price', min + '-' + max);

        var mucgia = `<a href="` + link + `">` + text + `</a>`;
        document.getElementsByClassName('pricesRangeFilter')[0]
            .getElementsByClassName('dropdown-content')[0].innerHTML += mucgia;
    }



    // Thêm chọn sắp xếp theo giá
    function addSortFilter(type, nameFilter, text) {
        var link = createLinkFilter('add', 'sort', {
            by: nameFilter,
            type: type
        });
        var sortTag = `<a href="` + link + `">` + text + `</a>`;

        document.getElementsByClassName('sortFilter')[0]
            .getElementsByClassName('dropdown-content')[0].innerHTML += sortTag;
    }

    // Chuyển mức giá về dạng chuỗi tiếng việt
    function priceToString(min, max) {
        if (min == 0) return 'Dưới ' + max / 1E6 + ' triệu';
        if (max == 0) return 'Trên ' + min / 1E6 + ' triệu';
        return 'Từ ' + min / 1E6 + ' - ' + max / 1E6 + ' triệu';
    }


    // Chuyển các loại sắp xếp về dạng chuỗi tiếng việt
    function sortToString(sortBy) {
        switch (sortBy) {
            case 'price':
                return 'Giá ';
            case 'star':
                return 'Sao ';
            case 'rateCount':
                return 'Đánh giá ';
            case 'name':
                return 'Tên ';
            default:
                return '';
        }
    }
