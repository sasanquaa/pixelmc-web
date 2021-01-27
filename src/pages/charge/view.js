import React from 'react';
import ReactDOMServer from 'react-dom/server'
import $ from 'jquery';
import '../../components/ChargeTable'
import {Button, Modal} from 'antd'
import ChargeTable from '../../components/ChargeTable';



function time() {
  return Math.floor(new Date().getTime() / 1000);
}

function BouncingBalls(props) {
    return (
        <div>
            <div id="ball-1" className="circle"></div>
            <div id="ball-2" className="circle"></div>
            <div id="ball-3" className="circle"></div>
        </div>
    );
}

function countDown() {
    let secondsToGo = 10;
    const modal = Modal.success({
        title: 'Lưu ý',
        content: `Bạn hãy vào game và gõ lệnh /warp shopxu để mua đồ bằng tiền xu nhá và nhớ làm trống túi
        đồ, nếu không đồ nhận được từ kit hoặc crate sẽ bị mất.`,
        okButtonProps: {
            style: {
                width: 'auto'
            }
        }
    });
    setTimeout(() => {
        modal.destroy();
    }, secondsToGo * 1000);
}

export default class ChargePage extends React.Component {
    
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.submitting = false;
        this.messagesCleanup = this.messagesCleanup.bind(this);
    }

    messagesCleanup() {
        $('h5').remove('.error-message');
        $('h5').remove('.success-message');
    }

    componentDidMount() {

        $(this.formRef.current).find('input').on('invalid', (e) => {
            e.preventDefa/emult();
        });


        $(this.formRef.current).on('submit', (e) => {
            e.preventDefault();   
            var invalidFields = $(this.formRef.current).find('input');
            this.messagesCleanup();

            var menhgia = $("#menhgia option:selected" ).val();
            var loaithe = $("#loaithe option:selected" ).val();
            var code = $("#code option:selected" ).val();

            if(menhgia === 'none' || loaithe === 'none' || code === 'none') {
                var msg = $('<h5>', {class: 'error-message'});
                if(menhgia === 'none') {
                    msg.html('Phải chọn mệnh giá.');
                    msg.insertBefore($('#menhgia').next());
                }else if(loaithe === 'none') 
                {
                    msg.html('Phải chọn loại thẻ.');
                    msg.insertBefore($('#loaithe').next());
                }
                else if(code === 'none') 
                {
                    msg.html('Phải chọn một code.');
                    msg.insertBefore($('#code').next());
                }
            }
            else if ($("#username").val() != null && $.trim($("#username").val()) === "" || 
            
                ($("#mathe").val() != null && $.trim($("#mathe").val()) === "") || 
                
                ($("#serial").val() != null && $.trim($("#serial").val()) === "")) {

                var msg = $('<h5>', {class: 'error-message'});
                msg.html('Các thông tin không được để trống.');
                msg.insertBefore($(invalidFields[invalidFields.length - 1]).next());

                if (invalidFields.length > 0 ) {
                    invalidFields[0].focus();
                }
            }else {
                if(this.submitting) return;
                var btn = $('#button-napthe');
                var buttonText = btn.text();
                this.submitting = true;
                var f = e.target;
                var msg = $('<h5>', {class: 'error-message'});
                var msgSuccess = $('<h5>', {class: 'success-message'});
				
				$.ajax({
					url: '/napthe/submit',
					method: 'post',
					data: {
                        username: $(f[0]).val().trim(),
						mathe: $(f[1]).val().trim(),
						serial: $(f[2]).val().trim(),
						menhgia: menhgia.trim(),
						loaithe: loaithe.trim(),
                        content: time(),
                        youtuber: $(f[5]).val().trim()
                    },
                    success: (data) => {
                        setTimeout( () => {
                            btn.html(buttonText);
                            this.submitting = false;
                            switch(data.status) {
                                case '00':
                                    countDown();
                                    msgSuccess.html('Nạp thẻ thành công! Hãy chờ hệ thống xử lý.');
                                    msgSuccess.insertBefore($('#code').next());
                                    break;
                                default:
                                    msg.html(data.msg);
                                    msg.insertBefore($('#code').next());
                                    break;
                            }
                        }, 1000)
                    }
                });
                btn.html(ReactDOMServer.renderToStaticMarkup(<BouncingBalls/>));
      
            }

        });

    }

    render() {
        return (
            <form method='get' title='' ref={this.formRef} className='charge'>
                <div className='wrapper'>
                    <div className='form-input'>
                        <div className='form-top'>
                            <h1>Điền vào thông tin</h1>
                            <h2>Lưu ý:</h2>
                            <h2>Nếu bạn nhập sai <b>tên in-game</b> hoặc <b>chưa được đăng ký</b> thì hệ thống sẽ không gửi vật phẩm.</h2>
                            <h2>Nếu bạn nhập sai <b>mệnh giá thẻ</b> thì bạn sẽ mất thẻ.</h2>
                            <h2>Admin sẽ không hoàn trả các trường hợp trên dưới mọi hình thức.</h2>
                        </div>
                        <input name='username' id='username' type='text' placeholder='Tên in-game'></input>,
                        <br/>
                        <br/>
                        <input name='mathe' id='mathe' type='text' placeholder='Mã thẻ'></input>
                        <br/>
                        <br/>
                        <input name='seri' id='serial' type='text' placeholder='Số serial thẻ'></input>
                        <br/>
                        <br/>
                        <select id='menhgia'>
                            <option value="none">Chọn mệnh giá</option>
                            <option value="10000">10.000 VNĐ / 10 Xu</option>
                            <option value="20000">20.000 VNĐ / 20 Xu</option>
                            <option value="50000">50.000 VNĐ / 50 Xu</option>
                            <option value="100000">100.000 VNĐ / 100 Xu</option>
                            <option value="200000">200.000 VNĐ / 200 Xu</option>
                            <option value="500000">500.000 VNĐ / 500 Xu</option>
                        </select>
                        <br/>
                        <br/>
                        <select id='loaithe'>
                            <option value="none">Loại thẻ</option>
                            <option value="Mobifone">Mobifone</option>
                            <option value="Vinaphone">Vinaphone</option>
                            <option value="Viettel">Viettel</option>
                        </select>
                        <br/>
                        <br/>
                        <select id='code'>
                            <option value="none">Code</option>
                            <option value="Kass">Kass</option>
                            <option value="TL">TL</option>
                            <option value="Noxuss">Noxuss</option>
                        </select>
                        <br/>
                        <br/>
                        <button id='button-napthe'>
                            Nạp thẻ
                        </button>
                        <div className='form-options'>
                        </div>
                    </div>
                    <ChargeTable />
                </div>
            </form>
        );
    }
}