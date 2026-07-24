// 斗鱼精简净化 - 直播间响应处理脚本
// 用于精简 API 响应，只保留直播间正常运行的必要数据

// 处理所有拦截到的响应
const body = $response.body;
const url = $request.url;
const method = $request.method;

// 如果是 reject-200 的请求，直接返回空
if (!$response.body) {
    $done({});
    return;
}

try {
    let data = JSON.parse(body);
    
    // 根据URL路径做不同处理
    if (url.includes('/mgapi/live/mroom/')) {
        // 房间信息 - 保留必要字段，移除活动/礼物相关
        if (url.includes('secondaryInfo')) {
            // 保留用户信息，但移除可能的活动数据
            if (data && data.data) {
                // 只保留最基础的信息
                const minimal = {
                    error: data.error || 0,
                    msg: data.msg || 'success',
                    data: {}
                };
                // 保留用户基础信息
                if (data.data.user) {
                    minimal.data.user = data.data.user;
                }
                if (data.data.room) {
                    minimal.data.room = {
                        room_id: data.data.room.room_id,
                        room_name: data.data.room.room_name,
                        room_status: data.data.room.room_status,
                        room_thumb: data.data.room.room_thumb,
                        owner_name: data.data.room.owner_name,
                        owner_uid: data.data.room.owner_uid,
                        cate_id: data.data.room.cate_id,
                        game_name: data.data.room.game_name,
                        online: data.data.room.online,
                        fans_count: data.data.room.fans_count
                    };
                }
                if (data.data.rank) {
                    minimal.data.rank = data.data.rank;
                }
                $done({ body: JSON.stringify(minimal) });
                return;
            }
        }
        else if (url.includes('getRoomLoopInfo')) {
            // 精简循环播放信息
            $done({ body: JSON.stringify({
                error: 0,
                data: { isShowLoopLogo: 0, isVod: 0 }
            })});
            return;
        }
        else {
            // 通用房间信息 - 只保留直播状态等关键字段
            if (data && data.data) {
                const keepFields = ['room_status', 'room_id', 'room_name', 'owner_name', 'owner_uid', 
                    'cate_id', 'cate_name', 'game_name', 'online', 'fans_count', 'room_thumb',
                    'show_status', 'video_loop', 'is_vod', 'start_time'];
                const minimal = { error: 0, msg: 'success', data: {} };
                for (const key of keepFields) {
                    if (data.data[key] !== undefined) {
                        minimal.data[key] = data.data[key];
                    }
                }
                $done({ body: JSON.stringify(minimal) });
                return;
            }
        }
    }
    
    // 视频流配置 - 放行不做修改
    if (url.includes('playclient.douyucdn.cn')) {
        $done({});
        return;
    }
    
    // 默认放行
    $done({});
    
} catch (e) {
    // 如果解析失败，放行原始响应
    $done({});
}