use sysinfo::{System, SystemExt, CpuExt};
use serde_json::json;
use chrono::{DateTime, Utc, FixedOffset};

#[tauri::command]
fn get_system_info() -> String {
    let mut system = System::new_all();
    system.refresh_all();

    let cpu_usage = system.global_cpu_info().cpu_usage();
    let memory_usage = (system.used_memory() as f64 / system.total_memory() as f64) * 100.0;

    let offset = FixedOffset::east(9 * 3600);
    // UTC
    let time: DateTime<Utc> = Utc::now();
    let local_time = time.with_timezone(&offset);

    let formatted_time = local_time.format("%H:%M").to_string();

    json!({
        "cpu_usage": cpu_usage,
        "memory_usage": memory_usage,
        "time": formatted_time,
    })
    .to_string()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

