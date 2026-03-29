import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Share,
  ScrollView,
  Modal,
} from 'react-native';

const POSTS = [
  {
    id: '1',
    author: 'Kiryl Pashkevich',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    image:
      'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '2 ч назад',
    likes: 128,
    text: 'Весенняя прогулка по набережной. Погода просто чудо!',
  },
  {
    id: '2',
    author: 'Demo User',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    image:
      'https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '5 ч назад',
    likes: 203,
    text: 'Наконец-то выбрался в горы. Как вам вид?',
  },
  {
    id: '3',
    author: 'Demo User 2',
    avatar:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    image:
      'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: 'вчера',
    likes: 89,
    text: 'Небольшая творческая фотосессия в студии 📸',
  },
  {
    id: '4',
    author: 'Demo User 3',
    avatar:
      'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=200',
    image:
      'https://images.pexels.com/photos/210205/pexels-photo-210205.jpeg?auto=compress&cs=tinysrgb&w=800',
    time: '2 дн назад',
    likes: 310,
    text: 'Моё любимое место у моря. Мог бы жить здесь вечно.',
  },
];

// Экран просмотра одного поста (как в соцсети)
function PostDetailScreen({ post, onBack, onShare, onOpenAccount, onOpenImage, isLiked, likeCount, onToggleLike }) {
  if (!post) return null;
  const openAccount = () => onOpenAccount({ author: post.author, avatar: post.avatar });
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.detailHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Пост</Text>
      </View>
      <ScrollView
        style={styles.detailScroll}
        contentContainerStyle={styles.detailContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.detailCard}>
          <TouchableOpacity style={styles.postHeader} onPress={openAccount} activeOpacity={0.8}>
            <TouchableOpacity onPress={() => onOpenImage(post.avatar)} activeOpacity={1}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.headerText}>
              <Text style={styles.author}>{post.author}</Text>
              <Text style={styles.time}>{post.time}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onOpenImage(post.image)}
            style={styles.detailImageTouch}
          >
            <Image source={{ uri: post.image }} style={styles.detailImage} resizeMode="cover" />
          </TouchableOpacity>
          <View style={styles.postBody}>
            <Text style={styles.detailPostText}>{post.text}</Text>
          </View>
          <View style={styles.actionsRow}>
            <View style={styles.actionsLeft}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onToggleLike(post.id)}
                activeOpacity={0.7}
              >
                <Text style={[styles.actionText, isLiked && styles.actionTextLiked]}>
                  {isLiked ? '❤️' : '🤍'} Нравится • {likeCount}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionText}>Комментарий</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => onShare(post)}
              activeOpacity={0.8}
            >
              <Text style={styles.shareText}>Поделиться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Экран чужого аккаунта: аватар, подписка, подписки, посты
function AccountScreen({ user, posts, onBack, onOpenImage, onOpenPost, onOpenAccount, isSubscribed, onSubscribeToggle, subscribedUsers }) {
  if (!user) return null;
  const userPosts = posts.filter((p) => p.author === user.author);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.detailHeader}>
        <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Назад</Text>
        </TouchableOpacity>
        <Text style={styles.detailHeaderTitle}>Профиль</Text>
      </View>
      <ScrollView
        style={styles.detailScroll}
        contentContainerStyle={styles.accountContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.accountCard}>
          <TouchableOpacity onPress={() => onOpenImage(user.avatar)} activeOpacity={0.9}>
            <Image source={{ uri: user.avatar }} style={styles.accountAvatar} />
          </TouchableOpacity>
          <Text style={styles.accountName}>{user.author}</Text>
          <Text style={styles.accountHint}>Нажмите на фото, чтобы открыть</Text>

          <TouchableOpacity
            style={[styles.subscribeButton, isSubscribed && styles.subscribeButtonActive]}
            onPress={() => onSubscribeToggle(user)}
            activeOpacity={0.8}
          >
            <Text style={styles.subscribeButtonText}>
              {isSubscribed ? '✓ Отписаться' : '+ Подписаться'}
            </Text>
          </TouchableOpacity>
        </View>

        {subscribedUsers.length > 0 && (
          <>
            <Text style={styles.accountSectionTitle}>Мои подписки ({subscribedUsers.length})</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.subscriptionsRow}
              style={styles.subscriptionsScroll}
            >
              {subscribedUsers.map((sub) => (
                <TouchableOpacity
                  key={sub.author}
                  style={styles.subscriptionChip}
                  onPress={() => onOpenAccount(sub)}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: sub.avatar }} style={styles.subscriptionAvatar} />
                  <Text style={styles.subscriptionName} numberOfLines={1}>{sub.author}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}

        <Text style={styles.accountSectionTitle}>Посты</Text>
        {userPosts.length === 0 ? (
          <Text style={styles.accountEmpty}>Нет постов</Text>
        ) : (
          userPosts.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.accountPostCard}
              activeOpacity={0.9}
              onPress={() => onOpenPost(post)}
            >
              <TouchableOpacity
                style={styles.accountPostImageWrap}
                onPress={() => onOpenImage(post.image)}
                activeOpacity={1}
              >
                <Image source={{ uri: post.image }} style={styles.accountPostImage} />
              </TouchableOpacity>
              <View style={styles.accountPostBody}>
                <Text style={styles.accountPostText} numberOfLines={2}>{post.text}</Text>
                <Text style={styles.accountPostTime}>{post.time} · ❤️ {post.likes}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fullScreenImageUri, setFullScreenImageUri] = useState(null);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);

  const openAccount = (user) => {
    setSelectedUser(user);
    setScreen('account');
  };

  const openPost = (post) => {
    setSelectedPost(post);
    setScreen('detail');
  };

  const isSubscribed = (user) => subscribedUsers.some((u) => u.author === user.author);
  const onSubscribeToggle = (user) => {
    if (isSubscribed(user)) {
      setSubscribedUsers((prev) => prev.filter((u) => u.author !== user.author));
    } else {
      setSubscribedUsers((prev) => [...prev, { author: user.author, avatar: user.avatar }]);
    }
  };

  const isLiked = (postId) => likedPostIds.includes(postId);
  const getLikeCount = (post) => post.likes + (isLiked(post.id) ? 1 : 0);
  const onToggleLike = (postId) => {
    setLikedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const onSharePost = async (post) => {
    try {
      await Share.share({
        message:
          `Пост из моего учебного приложения "Социальная сеть":\n\n` +
          `Автор: ${post.author}\n` +
          `Текст: ${post.text}\n\n` +
          `Картинка: ${post.image}`,
      });
    } catch (error) {
      console.log('Ошибка при шаринге:', error);
    }
  };

  const renderPost = ({ item, index }) => {
    const cardStyle = [
      styles.postCard,
      { marginTop: index === 0 ? 16 : -8, elevation: 4 + index },
    ];
    const openUserAccount = () => openAccount({ author: item.author, avatar: item.avatar });

    return (
      <TouchableOpacity
        style={cardStyle}
        activeOpacity={0.95}
        onPress={() => {
          setSelectedPost(item);
          setScreen('detail');
        }}
      >
        {/* Шапка поста — по нажатию переход в аккаунт */}
        <TouchableOpacity style={styles.postHeader} onPress={openUserAccount} activeOpacity={0.8}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.headerText}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </TouchableOpacity>

        {/* Картинка — по нажатию открывается на весь экран */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setFullScreenImageUri(item.image)}
          style={styles.postImageTouch}
        >
          <Image source={{ uri: item.image }} style={styles.postImage} />
        </TouchableOpacity>

        {/* Текст поста */}
        <View style={styles.postBody}>
          <Text style={styles.postText}>{item.text}</Text>
        </View>

        {/* Нижняя панель действий */}
        <View style={styles.actionsRow}>
          <View style={styles.actionsLeft}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onToggleLike(item.id)}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionText, isLiked(item.id) && styles.actionTextLiked]}>
                {isLiked(item.id) ? '❤️' : '🤍'} Нравится • {getLikeCount(item)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionText}>Комментарий</Text>
            </TouchableOpacity>
          </View>

          {/* КНОПКА ПОДЕЛИТЬСЯ (Share API) */}
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => onSharePost(item)}
          >
            <Text style={styles.shareText}>Поделиться</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Полноэкранный просмотр фото */}
      <Modal
        visible={!!fullScreenImageUri}
        transparent
        animationType="fade"
        onRequestClose={() => setFullScreenImageUri(null)}
      >
        <View style={styles.fullScreenOverlay}>
          <TouchableOpacity
            style={styles.fullScreenClose}
            onPress={() => setFullScreenImageUri(null)}
            activeOpacity={0.8}
          >
            <Text style={styles.fullScreenCloseText}>✕ Закрыть</Text>
          </TouchableOpacity>
          {fullScreenImageUri ? (
            <Image
              source={{ uri: fullScreenImageUri }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          ) : null}
        </View>
      </Modal>

      {screen === 'account' && selectedUser ? (
        <AccountScreen
          user={selectedUser}
          posts={POSTS}
          onBack={() => setScreen('list')}
          onOpenImage={setFullScreenImageUri}
          onOpenPost={openPost}
          onOpenAccount={openAccount}
          isSubscribed={isSubscribed(selectedUser)}
          onSubscribeToggle={onSubscribeToggle}
          subscribedUsers={subscribedUsers}
        />
      ) : screen === 'detail' && selectedPost ? (
        <PostDetailScreen
          post={selectedPost}
          onBack={() => setScreen('list')}
          onShare={onSharePost}
          onOpenAccount={openAccount}
          onOpenImage={setFullScreenImageUri}
          isLiked={isLiked(selectedPost.id)}
          likeCount={getLikeCount(selectedPost)}
          onToggleLike={onToggleLike}
        />
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          {/* Верхний бар приложения */}
          <View style={styles.topBar}>
            <Text style={styles.appTitle}>Социальная сеть</Text>
            <Text style={styles.appSubtitle}>Лабораторная работа №20</Text>
          </View>

          {/* Лента постов */}
          <FlatList
            data={POSTS}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const PRIMARY_COLOR = '#1C1C3C';
const ACCENT_COLOR = '#FFA726';
const BG_COLOR = '#0E1420';
const CARD_BG = '#1E2533';
const TEXT_MAIN = '#FFFFFF';
const TEXT_SECONDARY = '#A0AEC0';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: 24,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: TEXT_MAIN,
  },
  appSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  postCard: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    paddingBottom: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_MAIN,
  },
  time: {
    marginTop: 2,
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  postImage: {
    width: '100%',
    height: 260,
  },
  postImageTouch: {
    width: '100%',
  },
  postBody: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 4,
  },
  postText: {
    fontSize: 14,
    color: TEXT_MAIN,
  },
  actionsRow: {
    marginTop: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  actionText: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  actionTextLiked: {
    color: ACCENT_COLOR,
  },
  shareButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: ACCENT_COLOR,
  },
  shareText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  // Экран поста
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 16,
  },
  backButtonText: {
    fontSize: 17,
    color: ACCENT_COLOR,
    fontWeight: '600',
  },
  detailHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_MAIN,
  },
  detailScroll: {
    flex: 1,
  },
  detailContent: {
    padding: 16,
    paddingBottom: 32,
  },
  detailCard: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    overflow: 'hidden',
    paddingBottom: 16,
  },
  detailImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#111',
  },
  detailImageTouch: {
    width: '100%',
  },
  detailPostText: {
    fontSize: 16,
    lineHeight: 24,
    color: TEXT_MAIN,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  // Экран аккаунта пользователя
  accountContent: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  accountCard: {
    backgroundColor: CARD_BG,
    borderRadius: 24,
    overflow: 'hidden',
    padding: 24,
    alignItems: 'center',
    width: '100%',
  },
  accountAvatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#111',
  },
  accountName: {
    fontSize: 22,
    fontWeight: '700',
    color: TEXT_MAIN,
    marginTop: 16,
  },
  accountHint: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginTop: 6,
  },
  subscribeButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
  },
  subscribeButtonActive: {
    backgroundColor: ACCENT_COLOR,
  },
  subscribeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_MAIN,
  },
  accountSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT_MAIN,
    marginTop: 24,
    marginBottom: 12,
    paddingHorizontal: 4,
    width: '100%',
  },
  accountEmpty: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    width: '100%',
  },
  subscriptionsScroll: {
    marginBottom: 8,
  },
  subscriptionsRow: {
    paddingVertical: 8,
  },
  subscriptionChip: {
    alignItems: 'center',
    width: 72,
    marginRight: 12,
  },
  subscriptionAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#111',
  },
  subscriptionName: {
    fontSize: 11,
    color: TEXT_SECONDARY,
    marginTop: 4,
    maxWidth: 72,
  },
  accountPostCard: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    width: '100%',
  },
  accountPostImageWrap: {
    width: '100%',
  },
  accountPostImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#111',
  },
  accountPostBody: {
    padding: 12,
  },
  accountPostText: {
    fontSize: 14,
    color: TEXT_MAIN,
  },
  accountPostTime: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
  },
  // Полноэкранное фото
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenClose: {
    position: 'absolute',
    top: 48,
    right: 16,
    zIndex: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
  },
  fullScreenCloseText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});