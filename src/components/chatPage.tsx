import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    PlusSquareOutlined,
    SearchOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Input,
    message,
    Button,
    Layout,
    Menu,
    theme,
    Space
} from 'antd';
import { UserMessage, AssistantMessage } from './chatMessage';
import { ToggleButton } from './toggleButton';
import { callLLM } from '../utils/callLLM';
import config from '../config.json';
import logo from '../assets/react.svg';

const { Header, Sider, Content, Footer } = Layout;

const ChatPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggleStates, setToggleStates] = useState<{ [key: string]: boolean }>({});
    const [userInput, setUserInput] = useState('');
    const [history, setHistory] = useState<{ role: string; content: string }[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleToggle = (id: string, value: boolean) => {
        setToggleStates(prev => ({ ...prev, [id]: value }));
    }

    const sendUserMessage = async () => {
        const msg = userInput.trim()
        if (!msg) return;

        setUserInput('');
        setHistory(prev => [...prev, { role: 'user', content: msg }])

        try {
            if (toggleStates['think']) {
                messageApi.open({
                    type: 'warning',
                    content: 'Not Implemented `think`!'
                })
            }

            if (toggleStates['search']) {
                messageApi.open({
                    type: 'warning',
                    content: 'Not Implemented `search`!'
                })
            }

            const res = await callLLM(
                config.model.name,
                config.model.api_key,
                [...history, { role: 'user', content: msg }],
                config.model.url
            );
            if (res) {
                setHistory(prev => [...prev, { role: 'assistant', content: res }])
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: String(error)
            })
        }
    }

    return (
        <Layout style={{ height: '100%' }}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className='demo-logo-vertical' />
                <Menu theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Menu.Item
                        key='1'
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        {collapsed ? '展开' : '收起'}
                    </Menu.Item>

                    <Menu.Item
                        key='2'
                        icon={<PlusSquareOutlined />}
                        onClick={() => setHistory([])}
                    >
                        清空
                    </Menu.Item>

                    <Menu.Item key='3' icon={<SearchOutlined />}>
                        搜索
                    </Menu.Item>

                    <div style={{ flex: 1 }} />

                    <Menu.Item key='0' icon={<UserOutlined />}>
                        用户
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: '0 16px', background: colorBgContainer }}>
                    <Avatar
                        src={<img src={logo} alt='logo' />}
                        style={{ width: 40, height: 40 }}
                    />
                </Header>
                <Content
                    style={{
                        flex: 1,
                        padding: 24,
                        margin: '20px 10px',
                        overflowY: 'auto',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {history.length === 0 ? (
                        <div>
                            你好，我是你的智能助手。
                        </div>
                    ) : (
                        history.map((msg) => (
                            msg.role === 'user' ? (
                                <UserMessage message={msg.content} />
                            ) : msg.role === 'assistant' ? (
                                <AssistantMessage message={msg.content} />
                            ) : null
                        ))
                    )}
                </Content>
                <Footer>
                    <div style={{
                        position: 'relative',
                        borderRadius: 6
                    }}>
                        {contextHolder}
                        <Input
                            style={{
                                paddingBottom: 80,
                                border: '1px solid #a4a2a2ff',
                                flex: 1
                            }}
                            placeholder='请输入文本'
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onPressEnter={() => sendUserMessage()}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 3,
                            right: 0,
                            display: 'flex',
                            padding: '10px 10px',
                            borderTop: '1px',
                        }}>
                            <Space>
                                <ToggleButton id='think' content='深度思考' onToggle={handleToggle} />
                                <ToggleButton id='search' content='联网搜索' onToggle={handleToggle} />
                            </Space>
                            <div style={{ flex: 1 }} />
                            <Button type='primary' icon={<ArrowUpOutlined />} onClick={() => sendUserMessage()} />
                        </div>
                    </div>
                </Footer>
            </Layout>
        </Layout >
    );
};

export default ChatPage;
