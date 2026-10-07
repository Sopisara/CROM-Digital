import './style.css'

const icon = (name, size = 19) => {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-5 5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7Z" transform="translate(-1 -1)"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m7 10 5 5 5-5"/>',
    pulse: '<path d="M2 12h4l3-9 6 18 3-9h4"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    device: '<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M12 18h.01"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`
}

const patients = [
  { initials: 'กส', name: 'กานต์สินี สุขใจ', id: 'PT-24018', time: '09:42', motion: 'Flexion', value: '42°', status: 'ดีขึ้น', tone: 'green', color: 'lavender' },
  { initials: 'ธว', name: 'ธนวัฒน์ วงศ์ดี', id: 'PT-24016', time: '09:18', motion: 'Extension', value: '18°', status: 'ติดตาม', tone: 'amber', color: 'blue' },
  { initials: 'พน', name: 'พิมพ์ชนก นาคทอง', id: 'PT-24012', time: '08:54', motion: 'Flexion', value: '36°', status: 'ดีขึ้น', tone: 'green', color: 'peach' },
  { initials: 'อภ', name: 'อภิชาติ มีสุข', id: 'PT-24009', time: '08:31', motion: 'Lateral', value: '24°', status: 'คงที่', tone: 'slate', color: 'mint' },
]

const menu = [
  { name: 'ภาพรวม', icon: 'grid' },
  { name: 'เริ่มการวัด', icon: 'activity', badge: 'LIVE' },
  { name: 'ผลการวัด', icon: 'check' },
  { name: 'ประวัติการวัด', icon: 'clock' },
  { name: 'วิเคราะห์พัฒนาการ', icon: 'chart' },
  { name: 'ประวัติการฝึก', icon: 'pulse' },
  { name: 'ผู้รับการวัด', icon: 'grid' },
  { name: 'อุปกรณ์ CROM', icon: 'device' },
  { name: 'ตั้งค่าระบบ', icon: 'settings' },
]

function render() {
  clearInterval(window.cromLiveTimer)
  let active = sessionStorage.getItem('crom-page') || 'ภาพรวม'
  if (!menu.some(item => item.name === active)) active = 'ภาพรวม'
  document.documentElement.dataset.theme = localStorage.getItem('crom-theme') || 'dark'
  document.querySelector('#app').innerHTML = `
    <aside class="sidebar">
      <a class="brand" href="#" aria-label="CROM home"><span class="brand-mark">${icon('pulse', 23)}</span><span class="brand-copy"><strong>CROM<span>.</span></strong><small>CLINICAL SYSTEM</small></span></a>
      <div class="clinic-switch"><span class="clinic-avatar">${icon('activity', 17)}</span><span><small>คลินิกของคุณ</small><b>ศูนย์เวชศาสตร์ฟื้นฟู</b></span>${icon('down', 15)}</div>
      <div class="nav-caption">WORKSPACE</div>
      <nav class="navigation" aria-label="เมนูหลัก">${menu.map(item => `<button class="nav-item ${active === item.name ? 'active' : ''}" data-page="${item.name}"><span class="nav-icon">${icon(item.icon)}</span><span>${item.name}</span>${item.badge ? '<i class="live-mini">LIVE</i>' : ''}${active === item.name ? '<span class="nav-current"></span>' : ''}</button>`).join('')}</nav>
      <div class="sidebar-spacer"></div>
      <div class="device-card"><div class="device-card-top"><span class="device-icon">${icon('device', 19)}</span><span class="connection-dot"></span></div><strong>อุปกรณ์ CROM-01</strong><span class="device-sub">พร้อมใช้งาน · Bluetooth</span><div class="signal-row"><span>สัญญาณเชื่อมต่อ</span><b>98%</b></div><div class="signal-track"><i></i></div></div>
      <div class="sidebar-profile"><div class="doctor-avatar">นพ</div><div><b>นพ. ณัฐวุฒิ</b><small>แพทย์เวชศาสตร์ฟื้นฟู</small></div><button class="icon-button tiny" id="profile-menu" aria-label="เมนูโปรไฟล์">${icon('more', 18)}</button></div>
    </aside>
    <main class="main-area">
      <header class="topbar"><div class="breadcrumb">ศูนย์เวชศาสตร์ฟื้นฟู <span>/</span> <b>${active}</b></div><div class="top-actions"><div class="today-label">วันอังคารที่ 6 ตุลาคม 2569</div><button class="icon-button theme-toggle" id="theme-toggle" aria-label="เปลี่ยนธีม" title="เปลี่ยนโหมดสี">${icon(localStorage.getItem('crom-theme') === 'light' ? 'moon' : 'sun', 18)}</button><button class="icon-button notification" aria-label="การแจ้งเตือน">${icon('bell', 19)}<i></i></button><div class="top-divider"></div><div class="top-doctor"><span class="doctor-avatar small">นพ</span><span><b>นพ. ณัฐวุฒิ</b><small>แพทย์ผู้ดูแล</small></span>${icon('down', 15)}</div></div></header>
      <div class="page-content">
        <section class="welcome-row"><div><div class="eyebrow"><span class="eyebrow-line"></span> TUESDAY, 06 OCT 2026</div><h1>${active === 'ภาพรวม' ? 'สวัสดีครับ คุณหมอณัฐวุฒิ' : active}</h1><p>${active === 'ภาพรวม' ? 'นี่คือภาพรวมการติดตามผลการรักษาของคลินิกในวันนี้' : 'ติดตามผลการวัดและความคืบหน้าการรักษาของผู้ป่วย'}</p></div><div class="welcome-actions"><button class="button button-outline" id="export-btn">${icon('download', 16)} ส่งออกรายงาน</button><button class="button button-primary" id="new-session">${icon('plus', 17)} เริ่มการวัดใหม่</button></div></section>
        <section class="stats-grid" aria-label="สถิติวันนี้">
          <article class="stat-card"><div class="stat-heading"><span>ผู้ป่วยที่ติดตาม</span><span class="stat-icon sky">${icon('grid', 18)}</span></div><div class="stat-value">128 <small>คน</small></div><div class="stat-footer"><span class="trend up">${icon('arrow', 12)} 12.8%</span><span>จากเดือนที่แล้ว</span><div class="sparkline spark-a"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></article>
          <article class="stat-card"><div class="stat-heading"><span>การวัดวันนี้</span><span class="stat-icon violet">${icon('activity', 18)}</span></div><div class="stat-value">24 <small>ครั้ง</small></div><div class="stat-footer"><span class="trend up">${icon('arrow', 12)} 8.4%</span><span>จากสัปดาห์ที่แล้ว</span><div class="sparkline spark-b"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></article>
          <article class="stat-card"><div class="stat-heading"><span>ความคืบหน้าเฉลี่ย</span><span class="stat-icon teal">${icon('chart', 18)}</span></div><div class="stat-value">+18.6<small>%</small></div><div class="stat-footer"><span class="trend up">${icon('arrow', 12)} 4.2%</span><span>จากเดือนที่แล้ว</span><div class="sparkline spark-c"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></article>
          <article class="stat-card"><div class="stat-heading"><span>อุปกรณ์ที่เชื่อมต่อ</span><span class="stat-icon green">${icon('device', 18)}</span></div><div class="stat-value">06 <small>/ 08 เครื่อง</small></div><div class="stat-footer"><span class="device-online"><i></i>ออนไลน์ 6 เครื่อง</span><span class="offline-text">ออฟไลน์ 2</span><div class="sparkline spark-d"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></article>
        </section>
        <section class="middle-grid"><article class="panel chart-panel"><div class="panel-heading"><div><div class="panel-title">แนวโน้มความคืบหน้า</div><div class="panel-subtitle">ผลการวัดมุมการเคลื่อนไหวเฉลี่ยของผู้ป่วย</div></div><button class="select-button" id="period-select">7 วันล่าสุด ${icon('down', 14)}</button></div><div class="chart-legend"><span><i class="legend-dot blue-dot"></i> Flexion</span><span><i class="legend-dot violet-dot"></i> Extension</span><span class="chart-unit">มุมการเคลื่อนไหว (°)</span></div><div class="chart-wrap"><div class="y-labels"><span>60°</span><span>45°</span><span>30°</span><span>15°</span><span>0°</span></div><div class="chart-main"><div class="chart-grid"><i></i><i></i><i></i><i></i><i></i></div><svg class="line-chart" viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label="กราฟแนวโน้มมุมการเคลื่อนไหว"><defs><linearGradient id="areaBlue" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#61a8ff" stop-opacity=".19"/><stop offset="100%" stop-color="#61a8ff" stop-opacity="0"/></linearGradient><linearGradient id="areaViolet" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#a48aff" stop-opacity=".12"/><stop offset="100%" stop-color="#a48aff" stop-opacity="0"/></linearGradient></defs><path d="M0 128 C35 122 40 99 86 104 S130 120 172 92 S220 85 258 97 S307 89 344 71 S389 85 430 62 S475 72 516 50 S564 69 602 37 S655 44 700 20 L700 190 L0 190Z" fill="url(#areaBlue)"/><path d="M0 150 C34 147 49 130 86 136 S136 143 172 122 S216 132 258 117 S308 125 344 109 S394 123 430 101 S475 111 516 90 S561 101 602 78 S660 87 700 66 L700 190 L0 190Z" fill="url(#areaViolet)"/><path d="M0 128 C35 122 40 99 86 104 S130 120 172 92 S220 85 258 97 S307 89 344 71 S389 85 430 62 S475 72 516 50 S564 69 602 37 S655 44 700 20" fill="none" stroke="#65adff" stroke-width="2.5" vector-effect="non-scaling-stroke"/><path d="M0 150 C34 147 49 130 86 136 S136 143 172 122 S216 132 258 117 S308 125 344 109 S394 123 430 101 S475 111 516 90 S561 101 602 78 S660 87 700 66" fill="none" stroke="#a995ff" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="430" cy="62" r="4.5" fill="#0d1624" stroke="#65adff" stroke-width="2" vector-effect="non-scaling-stroke"/></svg><div class="x-labels"><span>24 ก.ย.</span><span>25 ก.ย.</span><span>26 ก.ย.</span><span>27 ก.ย.</span><span>28 ก.ย.</span><span>29 ก.ย.</span><span>6 ต.ค.</span></div></div></div><div class="chart-note"><span class="note-icon">${icon('arrow', 12)}</span><span>ผู้ป่วยมีความคืบหน้าเฉลี่ย <b>+18.6%</b> ในช่วง 7 วันที่ผ่านมา</span></div></article>
          <article class="panel distribution-panel"><div class="panel-heading"><div><div class="panel-title">ภาพรวมผู้ป่วย</div><div class="panel-subtitle">สถานะความคืบหน้าการรักษา</div></div><button class="icon-button" id="distribution-menu" aria-label="ดูการวิเคราะห์">${icon('more')}</button></div><div class="donut-wrap"><svg viewBox="0 0 160 160" class="donut" role="img" aria-label="กราฟวงแหวนสถานะผู้ป่วย"><circle cx="80" cy="80" r="62" fill="none" stroke="#202b3b" stroke-width="13"/><circle class="donut-segment segment-one" cx="80" cy="80" r="62" fill="none" stroke="#68aeff" stroke-width="13" stroke-linecap="round"/><circle class="donut-segment segment-two" cx="80" cy="80" r="62" fill="none" stroke="#a591ff" stroke-width="13" stroke-linecap="round"/><circle class="donut-segment segment-three" cx="80" cy="80" r="62" fill="none" stroke="#f5b966" stroke-width="13" stroke-linecap="round"/><circle class="donut-segment segment-four" cx="80" cy="80" r="62" fill="none" stroke="#57667b" stroke-width="13" stroke-linecap="round"/></svg><div class="donut-center"><strong>128</strong><span>ผู้ป่วยทั้งหมด</span></div></div><div class="legend-list"><div><span><i class="legend-dot blue-dot"></i> ดีขึ้น</span><b>68 <small>คน</small></b></div><div><span><i class="legend-dot violet-dot"></i> คงที่</span><b>32 <small>คน</small></b></div><div><span><i class="legend-dot amber-dot"></i> ติดตามใกล้ชิด</span><b>18 <small>คน</small></b></div><div><span><i class="legend-dot slate-dot"></i> ยังไม่เริ่ม</span><b>10 <small>คน</small></b></div></div><button class="text-link" data-page="วิเคราะห์พัฒนาการ">ดูรายงานทั้งหมด ${icon('chevron', 15)}</button></article></section>
        <section class="panel table-panel"><div class="table-header"><div><div class="panel-title">การวัดล่าสุด</div><div class="panel-subtitle">ข้อมูลการวัดที่บันทึกล่าสุดในระบบ</div></div><div class="table-actions"><label class="table-search">${icon('search', 16)}<input id="patient-search" placeholder="ค้นหาผู้ป่วย..." aria-label="ค้นหาผู้ป่วย"></label><button class="icon-button filter-btn" id="filter-btn" aria-label="กรองข้อมูล">${icon('filter', 17)}</button><button class="view-all" data-page="ประวัติการวัด">ดูทั้งหมด ${icon('chevron', 14)}</button></div></div><div class="table-scroll"><table><thead><tr><th>ผู้ป่วย</th><th>ประเภทการวัด</th><th>ค่าที่วัดได้</th><th>สถานะ</th><th>เวลาที่วัด</th><th></th></tr></thead><tbody id="patient-rows">${patients.map(row).join('')}</tbody></table><div class="empty-state" id="empty-state">ไม่พบข้อมูลผู้ป่วย</div></div><div class="table-footer"><span>แสดง <b>4</b> จาก <b>24</b> รายการในวันนี้</span><button class="pagination-button" id="dashboard-next-page" aria-label="ดูประวัติการวัด">${icon('chevron', 15)}</button></div></section>
        <footer class="footer"><span>© 2026 CROM Clinical System</span><span><i></i> ข้อมูลซิงก์ล่าสุด 09:45:32</span></footer>
        <div id="secondary-page"></div>
      </div>
    </main>
    <div class="toast" id="toast" role="status"></div>
    <div class="modal-backdrop" id="modal"><section class="modal"><button class="icon-button modal-close" aria-label="ปิด">×</button><span class="modal-icon">${icon('activity', 24)}</span><div class="panel-title">เริ่มการวัดใหม่</div><p>เลือกผู้ป่วยและอุปกรณ์เพื่อเริ่มบันทึกผลการวัด</p><label class="field-label">ผู้ป่วย</label><select id="patient-select"><option value="">เลือกผู้ป่วย</option>${patients.map(p => `<option value="${p.id}">${p.name} · ${p.id}</option>`).join('')}</select><label class="field-label">อุปกรณ์</label><div class="modal-device">${icon('device', 18)} <span>อุปกรณ์ CROM-01</span><i></i> <small>พร้อมใช้งาน</small></div><button class="button button-primary modal-start" id="start-session">เริ่มการวัด ${icon('chevron', 15)}</button></section></div>`
  showPage(active)
  bindEvents()
}

function showPage(active) {
  const overview = active === 'ภาพรวม'
  document.querySelectorAll('.stats-grid,.middle-grid,.table-panel,.footer').forEach(el => { el.hidden = !overview })
  const target = document.querySelector('#secondary-page')
  if (overview) {
    document.querySelector('.footer').before(target)
    target.innerHTML = `<section class="panel direction-panel"><div class="panel-heading"><div><div class="panel-title">ผลการเคลื่อนไหวของคอ 6 ทิศทาง</div><div class="panel-subtitle">ผลการวัดล่าสุด · กานต์สินี สุขใจ · 6 ต.ค. 2569</div></div><button class="view-all" data-page="ผลการวัด">ดูผลการวัด ${icon('chevron',14)}</button></div><div class="direction-grid">${[['Flexion',42,'blue'],['Extension',35,'violet'],['Left lateral flexion',31,'teal'],['Right lateral flexion',29,'teal'],['Left rotation',58,'amber'],['Right rotation',55,'amber']].map(([label,value,tone])=>`<div class="direction-item"><div><span>${label}</span><b>${value}°</b></div><i class="direction-track ${tone}"><em style="width:${Math.min(value/70*100,100)}%"></em></i></div>`).join('')}</div></section>`
    return
  }
  const pageViews = {
    'เริ่มการวัด': `<section class="panel content-page realtime-page"><div class="panel-heading"><div><div class="panel-title">Real-time Measurement</div><div class="panel-subtitle">เลือกผู้รับการวัด ปรับเทียบ และติดตามค่ามุมการเคลื่อนไหวแบบทันที</div></div><span class="live-status"><i></i> พร้อมวัด</span></div><div class="realtime-layout"><div class="measure-display"><span class="measure-caption">มุมการเคลื่อนไหว</span><strong id="live-value">—<small>°</small></strong><div class="live-chart"><svg viewBox="0 0 600 110" preserveAspectRatio="none"><path d="M0 85 L45 85 62 75 80 84 110 82 134 52 151 90 178 80 205 82 229 27 248 88 280 78 315 82 340 62 355 84 387 79 420 80 445 40 461 85 497 77 530 80 554 57 570 81 600 76" fill="none" stroke="#65adff" stroke-width="3"/></svg></div><div class="live-axis"><span>−30°</span><span>0°</span><span>30°</span><span>60°</span></div></div><div class="session-controls"><span class="control-label">ข้อมูลการวัด</span><label class="field-label">ผู้รับการวัด</label><select id="realtime-patient"><option value="">เลือกผู้รับการวัด</option>${patients.map(p=>`<option value="${p.id}">${p.name}</option>`).join('')}</select><label class="field-label">ทิศทางการเคลื่อนไหว</label><select id="motion-type"><option>Flexion</option><option>Extension</option><option>Left lateral flexion</option><option>Right lateral flexion</option><option>Left rotation</option><option>Right rotation</option></select><div class="connected-device">${icon('device',18)}<span><b>CROM-01 · ESP32 / IMU</b><small>เชื่อมต่อแล้ว · Bluetooth</small></span><i></i></div><button class="button button-outline" id="quick-calibrate">${icon('check',15)} ปรับเทียบอุปกรณ์</button><button class="button button-primary" id="live-start">${icon('activity',16)} เริ่มวัด</button><p class="session-hint">กราฟและค่ามุมเป็นข้อมูลจำลอง รอเชื่อมต่อข้อมูลจาก ESP32 ผ่าน API</p></div></div><div class="live-summary"><div><small>ค่าสูงสุด</small><b id="max-value">—°</b></div><div><small>ค่าเฉลี่ย</small><b id="avg-value">—°</b></div><div><small>จำนวนครั้ง</small><b id="rep-value">0</b></div><div><small>ระยะเวลา</small><b id="duration-value">00:00</b></div></div><button class="text-link" data-page="ผลการวัด">ดูผลการวัดล่าสุด ${icon('chevron',14)}</button></section>`,
    'ประวัติการวัด': `<section class="panel content-page"><div class="panel-heading"><div><div class="panel-title">ประวัติการวัด</div><div class="panel-subtitle">ค้นหาและตรวจสอบผลการวัดย้อนหลัง</div></div><button class="button button-outline" id="history-filter">${icon('calendar',15)} 30 วันที่ผ่านมา ${icon('down',13)}</button></div><div class="history-stats"><div><span>รายการทั้งหมด</span><b>248 <small>ครั้ง</small></b></div><div><span>ผู้ป่วยที่วัด</span><b>42 <small>คน</small></b></div><div><span>วันนี้</span><b>24 <small>ครั้ง</small></b></div></div><div class="history-search">${icon('search',16)}<input id="history-search" placeholder="ค้นหาชื่อหรือรหัสผู้ป่วย..."/><select id="history-status"><option value="">ทุกสถานะ</option><option value="ดีขึ้น">ดีขึ้น</option><option value="ติดตาม">ติดตาม</option><option value="คงที่">คงที่</option></select></div><div class="table-scroll"><table><thead><tr><th>ผู้ป่วย</th><th>ประเภทการวัด</th><th>ค่าที่วัดได้</th><th>สถานะ</th><th>วันที่ / เวลา</th></tr></thead><tbody id="history-rows">${[...patients,...patients].map((p,i)=>`<tr data-search="${p.name} ${p.id}" data-status="${p.status}"><td><div class="patient-cell"><span class="patient-avatar ${p.color}">${p.initials}</span><span><b>${p.name}</b><small>${p.id}</small></span></div></td><td>${p.motion}</td><td><b class="measure-value">${i>3?'31°':p.value}</b></td><td><span class="status-pill ${p.tone}"><i></i>${p.status}</span></td><td class="time-cell">6 ต.ค. 2569 · ${p.time}</td></tr>`).join('')}</tbody></table><div class="empty-state" id="history-empty">ไม่พบข้อมูลการวัด</div></div></section>`,
    'วิเคราะห์พัฒนาการ': `<section class="panel content-page analytics-page"><div class="panel-heading"><div><div class="panel-title">Progress / Analytics</div><div class="panel-subtitle">เปรียบเทียบผลการเคลื่อนไหวทั้ง 6 ทิศทางตลอด 4 สัปดาห์</div></div><select class="patient-picker" id="analytics-patient">${patients.map(p=>`<option>${p.name} · ${p.id}</option>`).join('')}</select></div><div class="comparison-card"><div class="comparison-heading"><div><b>เปรียบเทียบมุมการเคลื่อนไหวซ้ายและขวา</b><small>ค่าครั้งล่าสุด · หน่วยองศา</small></div><span class="comparison-key"><i></i> ซ้าย <i></i> ขวา</span></div>${[['Lateral flexion','ซ้าย 31°','ขวา 29°',31,29],['Rotation','ซ้าย 58°','ขวา 55°',58,55]].map(([name,l,r,lv,rv])=>`<div class="side-compare"><b>${name}</b><div><span>${l}</span><i><em style="width:${lv/70*100}%"></em></i><span>${r}</span><i class="right-bar"><em style="width:${rv/70*100}%"></em></i></div></div>`).join('')}</div><div class="analysis-direction-grid">${[['Flexion',42,35],['Extension',35,30],['Left lateral flexion',31,25],['Right lateral flexion',29,24],['Left rotation',58,51],['Right rotation',55,49]].map(([name,now,prev])=>`<article class="panel analysis-direction"><span>${name}</span><b>${now}°</b><small>ก่อนหน้า ${prev}° <em>+${now-prev}°</em></small><i><em style="width:${now/70*100}%"></em></i></article>`).join('')}</div><div class="analysis-grid"><article class="panel analysis-card"><div class="panel-title">แนวโน้มตามสัปดาห์</div><div class="panel-subtitle">Flexion และ Extension</div><div class="analysis-chart"><div class="bar-group"><i style="height:42%"></i><i class="pale" style="height:35%"></i><small>สัปดาห์ 1</small></div><div class="bar-group"><i style="height:55%"></i><i class="pale" style="height:43%"></i><small>สัปดาห์ 2</small></div><div class="bar-group"><i style="height:69%"></i><i class="pale" style="height:54%"></i><small>สัปดาห์ 3</small></div><div class="bar-group"><i style="height:83%"></i><i class="pale" style="height:64%"></i><small>สัปดาห์ 4</small></div></div><div class="bar-legend"><span><i></i> Flexion</span><span><i></i> Extension</span></div></article><article class="panel analysis-card"><div class="panel-title">ข้อสังเกต</div><div class="panel-subtitle">สรุปจากผลการวัดล่าสุด</div><div class="insight-box">${icon('activity',18)}<span><b>แนวโน้มดีขึ้น</b><small>ค่าการเคลื่อนไหวทั้ง 6 ทิศทางเพิ่มขึ้นจากการวัดครั้งก่อน</small></span></div><button class="button button-outline" data-page="ประวัติการวัด">ดูประวัติการวัด</button></article></div></section>`,
    'ผลการวัด': `<section class="panel content-page"><div class="panel-heading"><div><div class="panel-title">ผลการวัดล่าสุด</div><div class="panel-subtitle">สรุปค่ามุมการเคลื่อนไหวของคอทั้ง 6 ทิศทาง</div></div><span class="status-pill green"><i></i> บันทึกแล้ว</span></div><div class="result-meta"><div><small>ผู้รับการวัด</small><b>${patients[0].name} · ${patients[0].id}</b></div><div><small>วันที่ / เวลา</small><b>6 ต.ค. 2569 · 09:42 น.</b></div><div><small>อุปกรณ์</small><b>CROM-01</b></div></div><div class="result-directions">${[['Flexion','42°'],['Extension','35°'],['Left lateral flexion','31°'],['Right lateral flexion','29°'],['Left rotation','58°'],['Right rotation','55°']].map(([name,value])=>`<div><span>${name}</span><b>${value}</b></div>`).join('')}</div><div class="result-actions"><button class="button button-outline" id="save-result">${icon('check',15)} บันทึกผล</button><button class="button button-outline" id="print-result">${icon('download',15)} ส่งออกรายงาน</button><button class="button button-primary" data-page="เริ่มการวัด">เริ่มการวัดใหม่ ${icon('chevron',14)}</button></div></section>`,
    'ประวัติการฝึก': `<section class="content-page"><div class="training-stats"><article class="panel"><small>จำนวนครั้งที่ฝึก</small><b>18 <em>ครั้ง</em></b><span>ในช่วง 30 วันที่ผ่านมา</span></article><article class="panel"><small>เวลาในการฝึกรวม</small><b>4.5 <em>ชั่วโมง</em></b><span>เฉลี่ย 15 นาที / ครั้ง</span></article><article class="panel"><small>คะแนนเฉลี่ย</small><b>842 <em>คะแนน</em></b><span class="training-up">เพิ่มขึ้น 12% จากเดือนก่อน</span></article></div><section class="panel training-table"><div class="panel-heading"><div><div class="panel-title">ประวัติการฝึกและผลเกม</div><div class="panel-subtitle">ข้อมูลจากเกมฝึกการเคลื่อนไหวคอของผู้รับการวัด</div></div><select class="patient-picker" id="training-patient"><option>ผู้รับการวัดทั้งหมด</option>${patients.map(p=>`<option>${p.name}</option>`).join('')}</select></div><div class="table-scroll"><table><thead><tr><th>ผู้รับการวัด</th><th>เกม / กิจกรรม</th><th>คะแนน</th><th>ระยะเวลา</th><th>จำนวนครั้ง</th><th>วันที่ฝึก</th></tr></thead><tbody id="training-rows">${patients.map((p,i)=>`<tr data-search="${p.name} ${p.id}"><td><div class="patient-cell"><span class="patient-avatar ${p.color}">${p.initials}</span><span><b>${p.name}</b><small>${p.id}</small></span></div></td><td>${['เก็บดาว','บินหลบสิ่งกีดขวาง','ตามเป้าหมาย','เก็บดาว'][i]}</td><td><b class="measure-value">${920-i*76}</b></td><td>12 นาที</td><td>${18-i*2} ครั้ง</td><td class="time-cell">6 ต.ค. 2569</td></tr>`).join('')}</tbody></table></div></section></section>`,
    'ผู้รับการวัด': `<section class="panel content-page management-page"><div class="panel-heading"><div><div class="panel-title">จัดการผู้รับการวัด</div><div class="panel-subtitle">เพิ่ม แก้ไข ค้นหา และดูประวัติผู้รับการวัด</div></div><button class="button button-primary" id="add-patient">${icon('plus',15)} เพิ่มผู้รับการวัด</button></div><div class="history-search">${icon('search',16)}<input id="management-search" placeholder="ค้นหาชื่อหรือรหัสผู้รับการวัด..."/></div><div class="table-scroll"><table><thead><tr><th>ผู้รับการวัด</th><th>รหัส</th><th>การวัดล่าสุด</th><th>สถานะ</th><th>ประวัติ</th><th></th></tr></thead><tbody id="management-rows">${patients.map(p=>`<tr data-search="${p.name} ${p.id}"><td><div class="patient-cell"><span class="patient-avatar ${p.color}">${p.initials}</span><span><b>${p.name}</b><small>ผู้รับการวัด</small></span></div></td><td>${p.id}</td><td>${p.time} น. · ${p.value}</td><td><span class="status-pill ${p.tone}"><i></i>${p.status}</span></td><td><button class="view-history-link" data-patient-history="${p.id}">การวัด · การฝึก</button></td><td><button class="row-more edit-patient" data-patient="${p.id}" aria-label="แก้ไข ${p.name}">${icon('more',18)}</button></td></tr>`).join('')}</tbody></table></div></section>`,
    'อุปกรณ์ CROM': `<section class="panel content-page device-management"><div class="panel-heading"><div><div class="panel-title">จัดการอุปกรณ์ CROM</div><div class="panel-subtitle">ตรวจสอบสถานะและการเชื่อมต่อของอุปกรณ์วัด</div></div><button class="button button-primary" id="add-device">${icon('plus',15)} เชื่อมต่ออุปกรณ์</button></div><div class="managed-device"><span class="managed-device-icon">${icon('device',24)}</span><div class="managed-device-name"><b>CROM-01</b><small>อุปกรณ์วัดช่วงการเคลื่อนไหว · ESP32 + IMU</small></div><span class="live-status" id="managed-device-status"><i></i> เชื่อมต่อแล้ว</span><button class="icon-button" id="device-more">${icon('more')}</button></div><div class="managed-device-stats"><div><small>การเชื่อมต่อ</small><b>Bluetooth LE</b></div><div><small>ความแรงสัญญาณ</small><b class="training-up">98% · ดีมาก</b></div><div><small>ระดับแบตเตอรี่</small><b>84%</b></div><div><small>ปรับเทียบล่าสุด</small><b>6 ต.ค. 2569 · 09:30</b></div></div><div class="settings-actions"><button class="button button-outline" id="managed-test">${icon('activity',15)} ทดสอบการเชื่อมต่อ</button><button class="button button-outline" id="managed-calibrate">${icon('check',15)} ปรับเทียบอุปกรณ์</button><button class="button button-outline danger-outline" id="managed-disconnect">ยกเลิกการเชื่อมต่อ</button></div><p class="session-hint">ค่าที่แสดงเป็นข้อมูลตัวอย่าง สถานะจริงต้องรับจากอุปกรณ์ผ่าน Bluetooth/API</p></section>`,
    'ตั้งค่าระบบ': `<section class="panel content-page settings-page"><div class="panel-title">ตั้งค่าระบบ</div><div class="panel-subtitle">จัดการการแสดงผลและการเชื่อมต่ออุปกรณ์</div><div class="setting-row"><span class="setting-icon">${icon('sun',18)}</span><span><b>ธีมหน้าจอ</b><small>เลือกโหมดสว่างหรือโหมดมืด</small></span><button class="theme-switch" id="settings-theme"><span></span><b>${document.documentElement.dataset.theme === 'light' ? 'โหมดสว่าง' : 'โหมดมืด'}</b></button></div><div class="setting-row"><span class="setting-icon">${icon('device',18)}</span><span><b>อุปกรณ์ที่เชื่อมต่อ</b><small>CROM-01 · Bluetooth · สัญญาณ 98%</small></span><span class="live-status"><i></i> เชื่อมต่อแล้ว</span></div><div class="setting-row"><span class="setting-icon">${icon('activity',18)}</span><span><b>การซิงก์ข้อมูล</b><small>ซิงก์ล่าสุดวันนี้ เวลา 09:45</small></span><button class="button button-outline" id="sync-btn">ซิงก์ข้อมูล</button></div></section>`,
  }
  pageViews['ตั้งค่าระบบ'] = settingsPage()
  target.innerHTML = pageViews[active] || pageViews['ภาพรวม']
  if (active === 'ตั้งค่าระบบ') document.querySelector('#settings-theme').addEventListener('click', toggleTheme)
}

function settingsPage() {
  const theme = document.documentElement.dataset.theme || 'dark'
  const preferences = JSON.parse(localStorage.getItem('crom-alerts') || '{"disconnect":true,"sync":true,"saved":true,"battery":true}')
  const pref = (key) => preferences[key] ? 'checked' : ''
  return `<div class="settings-heading"><div><div class="panel-title">ตั้งค่าระบบ</div><div class="panel-subtitle">จัดการ Digital CROM อุปกรณ์ และบัญชีผู้ใช้งาน</div></div><span class="settings-save-state"><i></i> บันทึกการตั้งค่าอัตโนมัติ</span></div>
  <div class="settings-layout">
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('sun',18)}</span><span><b>การตั้งค่าการแสดงผล</b><small>ปรับรูปแบบหน้าจอให้เหมาะกับสภาพแวดล้อม</small></span></div><div class="settings-control-row"><span><b>ธีมหน้าจอ</b><small>เลือกโหมดสว่างหรือโหมดมืด</small></span><button class="theme-switch" id="settings-theme"><span></span><b>${theme === 'light' ? 'โหมดสว่าง' : 'โหมดมืด'}</b></button></div></section>
    <section class="panel settings-section device-settings"><div class="settings-section-title"><span class="setting-icon">${icon('device',18)}</span><span><b>การจัดการอุปกรณ์ CROM</b><small>ตรวจสอบสถานะอุปกรณ์ที่ใช้ในการวัด</small></span><span class="live-status" id="device-status"><i></i> เชื่อมต่อแล้ว</span></div><div class="device-details"><div><small>ชื่ออุปกรณ์</small><b>CROM-01</b></div><div><small>ประเภทการเชื่อมต่อ</small><b>Bluetooth LE</b></div><div><small>ความแรงสัญญาณ</small><b><span class="signal-indicator">▮▮▮▮</span> 98%</b></div><div><small>แบตเตอรี่</small><b><span class="battery-indicator">▰</span> 84%</b></div></div><div class="settings-actions"><button class="button button-outline" id="test-device">${icon('activity',15)} ทดสอบการเชื่อมต่อ</button><button class="button button-outline danger-outline" id="disconnect-device">ยกเลิกการเชื่อมต่อ</button></div></section>
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('check',18)}</span><span><b>การปรับเทียบอุปกรณ์</b><small>ตั้งตำแหน่งเริ่มต้นศีรษะเป็นค่าอ้างอิงก่อนวัด</small></span></div><div class="calibration-state"><span class="calibration-check">${icon('check',16)}</span><span><b id="calibration-label">ปรับเทียบแล้ว</b><small id="calibration-time">ปรับเทียบล่าสุด 6 ต.ค. 2569 เวลา 09:30 น.</small></span><button class="button button-outline" id="calibrate-device">เริ่มปรับเทียบ</button></div><p class="settings-help">ให้ผู้รับการวัดอยู่ในท่าตรง มองไปข้างหน้า แล้วกดเริ่มปรับเทียบ</p></section>
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('activity',18)}</span><span><b>การซิงก์ข้อมูล</b><small>จัดการการส่งผลการวัดเข้าสู่ระบบ</small></span><span class="sync-status" id="sync-status">พร้อมซิงก์</span></div><div class="sync-metrics"><div><small>ซิงก์ล่าสุด</small><b id="last-sync">วันนี้ 09:45 น.</b></div><div><small>ข้อมูลรอซิงก์</small><b id="pending-sync">3 รายการ</b></div><div><small>สถานะ</small><b class="sync-online"><i></i> เชื่อมต่อฐานข้อมูล</b></div><button class="button button-primary" id="sync-btn">${icon('activity',15)} ซิงก์ข้อมูลตอนนี้</button></div></section>
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('bell',18)}</span><span><b>การตั้งค่าการแจ้งเตือน</b><small>เลือกประเภทการแจ้งเตือนที่ต้องการรับ</small></span></div><div class="alert-options"><label><span><b>อุปกรณ์ CROM ขาดการเชื่อมต่อ</b><small>แจ้งเตือนเมื่ออุปกรณ์ออฟไลน์</small></span><input type="checkbox" data-alert="disconnect" ${pref('disconnect')}></label><label><span><b>การซิงก์ข้อมูลไม่สำเร็จ</b><small>แจ้งเตือนเมื่อส่งข้อมูลไม่สำเร็จ</small></span><input type="checkbox" data-alert="sync" ${pref('sync')}></label><label><span><b>บันทึกผลการวัดสำเร็จ</b><small>ยืนยันเมื่อบันทึกผลการวัดแล้ว</small></span><input type="checkbox" data-alert="saved" ${pref('saved')}></label><label><span><b>แบตเตอรี่อุปกรณ์อยู่ในระดับต่ำ</b><small>แจ้งเตือนเมื่อแบตเตอรี่ต่ำกว่า 20%</small></span><input type="checkbox" data-alert="battery" ${pref('battery')}></label></div></section>
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('grid',18)}</span><span><b>บัญชีผู้ใช้งาน</b><small>ข้อมูลบุคลากรที่เข้าสู่ระบบ</small></span></div><div class="account-card"><span class="doctor-avatar">นพ</span><span><b>นพ. ณัฐวุฒิ</b><small>nattawut@clinic.example · แพทย์เวชศาสตร์ฟื้นฟู</small></span><span class="role-tag">แพทย์</span></div><div class="settings-actions"><button class="button button-outline" id="edit-account">แก้ไขข้อมูลบัญชี</button><button class="button button-outline" id="change-password">เปลี่ยนรหัสผ่าน</button><button class="button button-outline danger-outline" id="logout">ออกจากระบบ</button></div><form class="password-form" id="password-form" hidden><label>รหัสผ่านใหม่<input type="password" required minlength="8" placeholder="อย่างน้อย 8 ตัวอักษร"></label><button class="button button-primary">บันทึกรหัสผ่าน</button></form></section>
    <section class="panel settings-section"><div class="settings-section-title"><span class="setting-icon">${icon('settings',18)}</span><span><b>ความเป็นส่วนตัวและการจัดการข้อมูล</b><small>การจัดเก็บและสำรองข้อมูลผู้รับการวัด</small></span></div><div class="privacy-row"><span><b>จัดเก็บข้อมูลผลการวัด</b><small>บันทึกผลเพื่อใช้ติดตามความคืบหน้าการรักษา</small></span><label class="toggle-control"><input type="checkbox" checked><i></i></label></div><div class="privacy-row"><span><b>สำรองข้อมูลอัตโนมัติ</b><small>สำรองข้อมูลขึ้นระบบเมื่อซิงก์สำเร็จ</small></span><label class="toggle-control"><input type="checkbox" checked><i></i></label></div><div class="privacy-note">ข้อมูลผู้รับการวัดควรเข้าถึงและจัดการตามนโยบายความเป็นส่วนตัวของหน่วยงาน</div><button class="button button-outline" id="backup-data">${icon('download',15)} สำรองข้อมูล</button></section>
    <section class="panel settings-section system-info"><div class="settings-section-title"><span class="setting-icon">${icon('pulse',18)}</span><span><b>ข้อมูลเกี่ยวกับระบบ</b><small>ข้อมูลสำหรับตรวจสอบและบำรุงรักษา</small></span></div><div class="system-info-grid"><div><small>ชื่อระบบ</small><b>Digital CROM Clinical System</b></div><div><small>รุ่นซอฟต์แวร์</small><b>Version 1.0.0</b></div><div><small>แพลตฟอร์ม</small><b>Web Application</b></div><div><small>เวอร์ชันข้อมูล</small><b>อัปเดต 6 ต.ค. 2569</b></div></div></section>
  </div>`
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
  localStorage.setItem('crom-theme', next)
  document.documentElement.dataset.theme = next
  const iconEl = document.querySelector('#theme-toggle')
  if (iconEl) iconEl.innerHTML = icon(next === 'light' ? 'moon' : 'sun', 18)
  const label = document.querySelector('#settings-theme b')
  if (label) label.textContent = next === 'light' ? 'โหมดสว่าง' : 'โหมดมืด'
}

function row(p) { return `<tr data-search="${p.name} ${p.id}" data-status="${p.status}"><td><div class="patient-cell"><span class="patient-avatar ${p.color}">${p.initials}</span><span><b>${p.name}</b><small>${p.id}</small></span></div></td><td><span class="motion-label"><i></i>${p.motion}</span></td><td><b class="measure-value">${p.value}</b></td><td><span class="status-pill ${p.tone}"><i></i>${p.status}</span></td><td class="time-cell">${p.time} น.</td><td><button class="row-more" aria-label="ดูรายละเอียด ${p.name}">${icon('more', 18)}</button></td></tr>` }

function toast(message) { const el = document.querySelector('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2800) }
function bindEvents() {
  document.querySelectorAll('[data-page]').forEach(el => el.addEventListener('click', () => { const page = el.dataset.page; sessionStorage.setItem('crom-page', page); render(); window.scrollTo({ top: 0, behavior: 'smooth' }) }))
  document.querySelector('#theme-toggle').addEventListener('click', toggleTheme)
  document.querySelector('#patient-search')?.addEventListener('input', e => { const q = e.target.value.trim().toLowerCase(); let count = 0; document.querySelectorAll('#patient-rows tr').forEach(tr => { const show = tr.dataset.search.toLowerCase().includes(q); tr.hidden = !show; if (show) count++ }); document.querySelector('#empty-state').style.display = count ? 'none' : 'block' })
  document.querySelector('#history-search')?.addEventListener('input', filterHistory)
  document.querySelector('#history-status')?.addEventListener('change', filterHistory)
  if (document.querySelector('#history-search') && sessionStorage.getItem('crom-history-query')) {
    document.querySelector('#history-search').value = sessionStorage.getItem('crom-history-query')
    filterHistory()
    sessionStorage.removeItem('crom-history-query')
  }
  document.querySelector('#history-filter')?.addEventListener('click', e => {
    const ranges = ['7 วันที่ผ่านมา', '30 วันที่ผ่านมา', '90 วันที่ผ่านมา']
    const current = Number(e.currentTarget.dataset.range || 1)
    const next = (current + 1) % ranges.length
    e.currentTarget.dataset.range = String(next)
    e.currentTarget.innerHTML = `${icon('calendar',15)} ${ranges[next]} ${icon('down',13)}`
    toast(`เลือกช่วงเวลา: ${ranges[next]}`)
  })
  document.querySelector('#sync-btn')?.addEventListener('click', e => {
    const button = e.currentTarget
    const status = document.querySelector('#sync-status')
    button.disabled = true
    button.textContent = 'กำลังซิงก์...'
    status.textContent = 'กำลังซิงก์'
    setTimeout(() => {
      const now = new Intl.DateTimeFormat('th-TH', { hour: '2-digit', minute: '2-digit' }).format(new Date())
      document.querySelector('#last-sync').textContent = `วันนี้ ${now} น.`
      document.querySelector('#pending-sync').textContent = '0 รายการ'
      status.textContent = 'ซิงก์สำเร็จ'
      button.innerHTML = `${icon('check',15)} ซิงก์ข้อมูลตอนนี้`
      button.disabled = false
      toast('ซิงก์ข้อมูลตัวอย่างสำเร็จ')
    }, 900)
  })
  document.querySelector('#test-device')?.addEventListener('click', e => {
    const button = e.currentTarget
    button.disabled = true
    button.textContent = 'กำลังทดสอบ...'
    setTimeout(() => { button.disabled = false; button.innerHTML = `${icon('activity',15)} ทดสอบการเชื่อมต่อ`; toast('ทดสอบการเชื่อมต่อ CROM-01 สำเร็จ') }, 900)
  })
  document.querySelector('#disconnect-device')?.addEventListener('click', e => {
    const disconnected = e.currentTarget.dataset.disconnected === 'true'
    e.currentTarget.dataset.disconnected = String(!disconnected)
    e.currentTarget.textContent = disconnected ? 'ยกเลิกการเชื่อมต่อ' : 'เชื่อมต่ออุปกรณ์อีกครั้ง'
    document.querySelector('#device-status').innerHTML = disconnected ? '<i></i> เชื่อมต่อแล้ว' : '<i></i> ยกเลิกการเชื่อมต่อแล้ว'
    document.querySelector('#device-status').classList.toggle('status-disconnected', !disconnected)
    toast(disconnected ? 'เชื่อมต่ออุปกรณ์ตัวอย่างแล้ว' : 'ยกเลิกการเชื่อมต่ออุปกรณ์ตัวอย่างแล้ว')
  })
  document.querySelector('#calibrate-device')?.addEventListener('click', e => {
    const button = e.currentTarget
    button.disabled = true
    button.textContent = 'กำลังปรับเทียบ...'
    document.querySelector('#calibration-label').textContent = 'กำลังปรับเทียบอุปกรณ์'
    setTimeout(() => {
      const stamp = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
      document.querySelector('#calibration-label').textContent = 'ปรับเทียบแล้ว'
      document.querySelector('#calibration-time').textContent = `ปรับเทียบล่าสุด ${stamp} น.`
      button.disabled = false
      button.textContent = 'ปรับเทียบอีกครั้ง'
      toast('ปรับเทียบอุปกรณ์ตัวอย่างสำเร็จ')
    }, 1300)
  })
  document.querySelectorAll('[data-alert]').forEach(input => input.addEventListener('change', () => {
    const prefs = Object.fromEntries([...document.querySelectorAll('[data-alert]')].map(control => [control.dataset.alert, control.checked]))
    localStorage.setItem('crom-alerts', JSON.stringify(prefs))
  }))
  document.querySelectorAll('.toggle-control input').forEach(input => input.addEventListener('change', () => toast(input.checked ? 'เปิดการตั้งค่าแล้ว' : 'ปิดการตั้งค่าแล้ว')))
  document.querySelector('#edit-account')?.addEventListener('click', () => toast('ข้อมูลบัญชีตัวอย่าง: นพ. ณัฐวุฒิ · แพทย์'))
  document.querySelector('#change-password')?.addEventListener('click', () => { document.querySelector('#password-form').hidden = !document.querySelector('#password-form').hidden })
  document.querySelector('#password-form')?.addEventListener('submit', e => { e.preventDefault(); e.currentTarget.reset(); e.currentTarget.hidden = true; toast('บันทึกรหัสผ่านตัวอย่างแล้ว') })
  document.querySelector('#logout')?.addEventListener('click', () => toast('ฟังก์ชันออกจากระบบจะทำงานเมื่อเชื่อมต่อระบบบัญชีผู้ใช้'))
  document.querySelector('#backup-data')?.addEventListener('click', () => downloadFile('crom-backup.json', JSON.stringify({ patients, exportedAt: new Date().toISOString() }, null, 2), 'application/json'))
  document.querySelector('#save-result')?.addEventListener('click', () => {
    const results = JSON.parse(localStorage.getItem('crom-results') || '[]')
    results.unshift({ patient: patients[0].id, date: new Date().toISOString(), values: { Flexion: 42, Extension: 35, LeftLateral: 31, RightLateral: 29, LeftRotation: 58, RightRotation: 55 } })
    localStorage.setItem('crom-results', JSON.stringify(results))
    toast('บันทึกผลการวัดตัวอย่างลงในเครื่องแล้ว')
  })
  document.querySelector('#print-result')?.addEventListener('click', () => downloadFile('crom-measurement-result.csv', 'Direction,Angle\nFlexion,42\nExtension,35\nLeft lateral flexion,31\nRight lateral flexion,29\nLeft rotation,58\nRight rotation,55\n', 'text/csv;charset=utf-8'))
  document.querySelector('#quick-calibrate')?.addEventListener('click', e => { const button = e.currentTarget; button.disabled = true; button.textContent = 'กำลังปรับเทียบ...'; setTimeout(() => { button.disabled = false; button.textContent = 'ปรับเทียบอุปกรณ์'; toast('ปรับเทียบอุปกรณ์ตัวอย่างสำเร็จ') }, 900) })
  document.querySelector('#management-search')?.addEventListener('input', e => {
    const query = e.target.value.toLowerCase().trim()
    document.querySelectorAll('#management-rows tr').forEach(tr => { tr.hidden = !tr.dataset.search.toLowerCase().includes(query) })
  })
  document.querySelector('#training-patient')?.addEventListener('change', e => {
    const query = e.target.value === 'ผู้รับการวัดทั้งหมด' ? '' : e.target.value.toLowerCase()
    document.querySelectorAll('#training-rows tr').forEach(tr => { tr.hidden = query && !tr.dataset.search.toLowerCase().includes(query) })
  })
  document.querySelector('#analytics-patient')?.addEventListener('change', e => {
    const selected = e.target.value.split(' · ')[0]
    document.querySelector('.comparison-heading small').textContent = `ผลล่าสุดของ ${selected} · หน่วยองศา`
    toast(`แสดงผลวิเคราะห์ของ ${selected}`)
  })
  document.querySelector('#add-patient')?.addEventListener('click', () => {
    const name = window.prompt('ชื่อผู้รับการวัด')?.trim()
    if (!name) return
    const initials = name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
    patients.unshift({ initials, name, id: `PT-${Date.now().toString().slice(-5)}`, time: '—', motion: 'ยังไม่มีข้อมูล', value: '—', status: 'ยังไม่เริ่ม', tone: 'slate', color: 'blue' })
    render()
    toast('เพิ่มผู้รับการวัดในข้อมูลตัวอย่างแล้ว')
  })
  document.querySelectorAll('.edit-patient').forEach(button => button.addEventListener('click', () => {
    const patient = patients.find(item => item.id === button.dataset.patient)
    const name = window.prompt('แก้ไขชื่อผู้รับการวัด', patient?.name)?.trim()
    if (!patient || !name) return
    patient.name = name
    patient.initials = name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
    render()
    toast('แก้ไขข้อมูลในตัวอย่างแล้ว')
  }))
  document.querySelectorAll('[data-patient-history]').forEach(button => button.addEventListener('click', () => {
    const patient = patients.find(item => item.id === button.dataset.patient)
    sessionStorage.setItem('crom-page', 'ประวัติการวัด')
    sessionStorage.setItem('crom-history-query', patient?.name || '')
    render()
  }))
  document.querySelector('#add-device')?.addEventListener('click', () => toast('การค้นหาอุปกรณ์จริงต้องกำหนด Bluetooth service UUID ของ ESP32 ก่อน'))
  document.querySelector('#managed-test')?.addEventListener('click', () => toast('ทดสอบการเชื่อมต่อ CROM-01 ตัวอย่างสำเร็จ'))
  document.querySelector('#managed-calibrate')?.addEventListener('click', () => toast('ปรับเทียบ CROM-01 ตัวอย่างสำเร็จ'))
  document.querySelector('#device-more')?.addEventListener('click', () => toast('อุปกรณ์ CROM-01 · Bluetooth LE · แบตเตอรี่ 84%'))
  document.querySelector('#managed-disconnect')?.addEventListener('click', e => {
    const disconnected = e.currentTarget.dataset.disconnected === 'true'
    e.currentTarget.dataset.disconnected = String(!disconnected)
    e.currentTarget.textContent = disconnected ? 'ยกเลิกการเชื่อมต่อ' : 'เชื่อมต่ออีกครั้ง'
    document.querySelector('#managed-device-status').innerHTML = disconnected ? '<i></i> เชื่อมต่อแล้ว' : '<i></i> ยกเลิกการเชื่อมต่อ'
    document.querySelector('#managed-device-status').classList.toggle('status-disconnected', !disconnected)
  })
  const livePatient = document.querySelector('#realtime-patient')
  if (livePatient && sessionStorage.getItem('crom-patient')) livePatient.value = sessionStorage.getItem('crom-patient')
  document.querySelector('#motion-type')?.addEventListener('change', e => {
    document.querySelector('.measure-caption').textContent = e.target.value
    document.querySelector('#live-value').innerHTML = '—<small>°</small>'
  })
  document.querySelector('#live-start')?.addEventListener('click', e => {
    if (!document.querySelector('#realtime-patient').value) return toast('กรุณาเลือกผู้ป่วยก่อนเริ่มการวัด')
    const running = e.currentTarget.dataset.running === 'true'
    e.currentTarget.dataset.running = String(!running)
    e.currentTarget.innerHTML = running ? `${icon('activity',16)} เริ่มวัด` : `${icon('check',16)} หยุดการวัด`
    e.currentTarget.classList.toggle('button-stop', !running)
    document.querySelector('.live-status').innerHTML = running ? '<i></i> พร้อมวัด' : '<i></i> กำลังวัด'
    if (!running) {
      let n = 0
      window.cromLiveTimer = setInterval(() => { n++; const value = 24 + Math.round(17 * Math.abs(Math.sin(n / 2.4))); document.querySelector('#live-value').innerHTML = `${value}<small>°</small>`; document.querySelector('#max-value').textContent = `${Math.max(value, Number(document.querySelector('#max-value').textContent.replace('°','')) || 0)}°`; document.querySelector('#avg-value').textContent = `${Math.round((value + 31) / 2)}°`; document.querySelector('#rep-value').textContent = `${Math.floor(n / 3)}`; document.querySelector('#duration-value').textContent = `00:${String(n).padStart(2,'0')}` }, 1000)
    } else clearInterval(window.cromLiveTimer)
  })
  document.querySelector('#new-session')?.addEventListener('click', () => document.querySelector('#modal').classList.add('open'))
  document.querySelector('.modal-close').addEventListener('click', () => document.querySelector('#modal').classList.remove('open'))
  document.querySelector('#modal').addEventListener('click', e => { if (e.target.id === 'modal') e.currentTarget.classList.remove('open') })
  document.querySelector('#start-session').addEventListener('click', () => { const patient = document.querySelector('#patient-select').value; if (!patient) return toast('กรุณาเลือกผู้ป่วยก่อนเริ่มการวัด'); sessionStorage.setItem('crom-patient', patient); document.querySelector('#modal').classList.remove('open'); toast('กำลังเชื่อมต่ออุปกรณ์ CROM-01...'); setTimeout(() => { sessionStorage.setItem('crom-page', 'เริ่มการวัด'); render(); document.querySelector('#live-start')?.click() }, 950) })
  document.querySelector('#export-btn')?.addEventListener('click', () => downloadFile('crom-measurements.csv', ['Patient ID,Patient,Motion,Value,Status', ...patients.map(p => `${p.id},${p.name},${p.motion},${p.value},${p.status}`)].join('\n'), 'text/csv;charset=utf-8'))
  document.querySelector('#period-select')?.addEventListener('click', e => {
    const days = e.currentTarget.dataset.days === '30' ? '7' : '30'
    e.currentTarget.dataset.days = days
    e.currentTarget.innerHTML = `${days} วันล่าสุด ${icon('down',14)}`
    document.querySelector('.chart-panel .panel-subtitle').textContent = `ผลการวัดมุมการเคลื่อนไหวเฉลี่ยของผู้ป่วย · ${days} วันล่าสุด`
    toast(`เปลี่ยนช่วงข้อมูลเป็น ${days} วันล่าสุด`)
  })
  document.querySelector('#filter-btn')?.addEventListener('click', e => {
    const filters = ['', 'ดีขึ้น', 'ติดตาม', 'คงที่']
    const i = (Number(e.currentTarget.dataset.filter || 0) + 1) % filters.length
    e.currentTarget.dataset.filter = String(i)
    let count = 0
    document.querySelectorAll('#patient-rows tr').forEach(row => { row.hidden = Boolean(filters[i]) && row.dataset.status !== filters[i]; if (!row.hidden) count++ })
    toast(filters[i] ? `กรองสถานะ: ${filters[i]} (${count} รายการ)` : 'แสดงทุกสถานะ')
  })
  document.querySelector('.notification').addEventListener('click', () => toast('ไม่มีการแจ้งเตือนใหม่'))
  document.querySelector('#profile-menu')?.addEventListener('click', () => { sessionStorage.setItem('crom-page', 'ตั้งค่าระบบ'); render() })
  document.querySelector('#distribution-menu')?.addEventListener('click', () => { sessionStorage.setItem('crom-page', 'วิเคราะห์พัฒนาการ'); render() })
  document.querySelector('#dashboard-next-page')?.addEventListener('click', () => { sessionStorage.setItem('crom-page', 'ประวัติการวัด'); render() })
  document.querySelectorAll('.row-more:not(.edit-patient)').forEach((el, i) => el.addEventListener('click', () => toast(`ข้อมูลผู้รับการวัด: ${patients[i]?.name || 'ไม่มีข้อมูล'}`)))
}

function downloadFile(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
  toast(`ดาวน์โหลด ${filename} แล้ว`)
}

function filterHistory() {
  const query = document.querySelector('#history-search').value.trim().toLowerCase()
  const status = document.querySelector('#history-status').value
  let count = 0
  document.querySelectorAll('#history-rows tr').forEach(tr => { const show = tr.dataset.search.toLowerCase().includes(query) && (!status || tr.dataset.status === status); tr.hidden = !show; if (show) count++ })
  document.querySelector('#history-empty').style.display = count ? 'none' : 'block'
}

render()
