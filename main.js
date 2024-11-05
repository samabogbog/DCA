window.onload = function() {
    const month = 12;

    var cap = document.getElementById('cap');
    var cap_text = document.getElementById('cap_text');
    var m_invest = document.getElementById('m_invest');
    var m_invest_text = document.getElementById('m_invest_text');
    var APY = document.getElementById('APY');
    var APY_text = document.getElementById('APY_text');
    var YEAR = document.getElementById('year');
    var YEAR_text = document.getElementById('year_text');
    var result = document.getElementById('result');

    var _cap = parseInt(cap.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    cap_text.value = _cap;
    var _m_invest = parseInt(m_invest.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
    m_invest_text.value = _m_invest;
    var _APY = parseFloat(APY.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
    APY_text.value = _APY + "%";
    YEAR_text.value = YEAR.value;
    
    cap.addEventListener('input', function(){
        var _cap = parseInt(cap.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        cap_text.value = _cap;
        if (m_invest.value > 1000000) {
            m_invest.value = 1000000;
            m_invest_text.value = parseInt(m_invest.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }
        if (isNaN(_m_invest.replace(/,/g, "")) === true) {
            m_invest_text.value = 0;
        }
        calc();
    });

    m_invest.addEventListener('input', function(){
        var _m_invest = parseInt(m_invest.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        m_invest_text.value = _m_invest;
        if (m_invest.value > 1000000) {
            m_invest.value = 1000000;
            m_invest_text.value = parseInt(m_invest.value).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        }
        if (isNaN(_m_invest.replace(/,/g, "")) === true) {
            m_invest_text.value = 0;
        }
        calc();
    });

    APY.addEventListener('input', function(){
        var _APY = parseFloat(APY.value).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
        APY_text.value = _APY + "%"
        if (isNaN(_APY.replace(/,/g, "")) === true) {
            APY_text.value = 0 + "%";
        }
        calc();
    });

    YEAR.addEventListener('input', function(){
        YEAR_text.value = YEAR.value
        calc();
    })

    function calc() {
        var this_year = 0;
        var fix_interest = (m_invest.value * month);
        
        var cap_bar = document.getElementById('cap_bar');
        var int_bar = document.getElementById('int_bar');
        var first_year = parseInt(cap.value);

        var y = 1;
        for(i=1; i<=YEAR.value; i++){
            this_year =  ((first_year * y) + fix_interest + this_year) + ((((first_year * y) + fix_interest + this_year) * APY.value) / 100);
            y = 0;
        }
        result.value = this_year.toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1});
    
        var capital = parseInt(cap.value) + m_invest.value * month * YEAR.value;
        var interest = (this_year - capital);
        var total = parseFloat(capital) + parseFloat(interest);
        var _cap = (100 / total) * parseFloat(capital);
        var _int = (100 / total) * parseFloat(interest);
        var r = document.querySelector(':root');
        r.style.setProperty('--cap_bar_width', _cap + "%");
        r.style.setProperty('--int_bar_width', _int + "%");
        cap_bar.innerText = parseFloat(capital).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0});
        int_bar.innerText = parseFloat(interest).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1}) + " (+" + ((_int/_cap)*100).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 1}) + "%)";
    }
    calc();
}