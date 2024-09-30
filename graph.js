// 노드와 에지 데이터를 불러옵니다.
fetch('nodes.json')
  .then(response => response.json())
  .then(nodesData => {
    fetch('edges.json')
      .then(response => response.json())
      .then(edgesData => {
        // Vis.js의 DataSet으로 변환
        var nodes = new vis.DataSet(nodesData);
        var edges = new vis.DataSet(edgesData);

        // 그래프를 표시할 컨테이너
        var container = document.getElementById('graph-container');

        // 그래프 데이터와 옵션
        var data = {
          nodes: nodes,
          edges: edges
        };

        var options = {
          nodes: {
            shape: 'dot',
            size: 20,
            font: {
              size: 16,
              color: '#000'
            }
          },
          edges: {
            width: 2,
            color: '#ccc'
          },
          interaction: {
            hover: true
          },
          physics: {
            enabled: true
          }
        };

        // 네트워크(그래프) 생성
        var network = new vis.Network(container, data, options);

        // 노드 클릭 이벤트 처리
        network.on('click', function(params) {
          if (params.nodes.length > 0) {
            var nodeId = params.nodes[0];
            var nodeData = nodes.get(nodeId);
            // 새 창에서 Notion 페이지 열기
            window.open(nodeData.url, '_blank');
          }
        });
      })
      .catch(error => console.error('에지 데이터 로드 중 오류 발생:', error));
  })
  .catch(error => console.error('노드 데이터 로드 중 오류 발생:', error));
