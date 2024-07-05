class PostsController < ApplicationController
    before_action :set_group
    skip_before_action :set_group, only:[:index, :show]
    before_action :set_post, only: [:show, :update, :destroy]

    def index
      posts = Post.includes(:group, :user, :comments).order(created_at: :desc).map do |post|


        post_json=
        {
          id: post.id,
          user_id: post.user.id,
          username: post.user.username,
          user_profile_image: post.user&.profile_image_url,
          title: post.title,
          content: post.content,  # Adjust this based on your actual Post model attributes
          created_at: post.created_at,
          group_id: post.group.id,    # Group ID
          group_name: post.group.name,  # Group Name
          comments: post.comments.map do |comment|
            {
              id: comment.id,
              content: comment.content,
              user_id: comment.user_id,
              username: comment.user.username,
              user_profile_image: post.user&.profile_image_url, # Assuming 'username' is the attribute in User model
              created_at: comment.created_at,
              group_id: comment.post.group.id,
              post_id: post.id
            }
          end #
        }


        # Include images associated with the post
        images = []
        (1..5).each do |i|
          image = post.send("post_image_#{i}")
          images.push(image.url) if image
        end
        post_json['images'] = images

        post_json
      end

      render json: posts, status: :ok
    end

    def index_group
      posts = @group.posts.order(created_at: :desc).map do |post|
        post_json=
        {
          id: post.id,
          user_id: post.user.id,
          username: post.user.username,
          user_profile_image: post.user&.profile_image_url,
          title: post.title,
          content: post.content,  # Adjust this based on your actual Post model attributes
          created_at: post.created_at,
          group_id: @group.id,    # Group ID
          group_name: @group.name,  # Group Name
          comments: post.comments.map do |comment|
            {
              id: comment.id,
              content: comment.content,
              user_id: comment.user_id,
              username: comment.user.username,
              user_profile_image: post.user&.profile_image_url, # Assuming 'username' is the attribute in User model
              created_at: comment.created_at,
              group_id: comment.post.group.id,
              post_id: post.id
            }
          end #
        }

        images = []
        (1..5).each do |i|
          image = post.send("post_image_#{i}")
          images.push(image.url) if image
        end
        post_json['images'] = images

        post_json
      end

      render json: posts, status: :ok
    end

    def show
      post = {
        id: @post.id,
        user_id: @post.user.id,
        user_profile_image: @post.user&.profile_image_url,
        title: @post.title,
        content: @post.content,
        created_at: @post.created_at,
        group_id: @post.group.id,
        group_name: @post.group.name,
        comments: @post.comments.map do |comment|
          {
            id: comment.id,
            content: comment.content,
            user_id: comment.user_id,
            username: comment.user.username,
            user_profile_image: @post.user&.profile_image_url,
            created_at: comment.created_at,
            group_id: comment.post.group.id,
            post_id: @post.id
          }
        end,
        images: []  # Initialize images array
      }

      (1..5).each do |i|
        image_url = @post.send("post_image_#{i}")&.url
        post[:images] << image_url if image_url
      end

      render json: post, status: :ok
    end


    def create
      @post = @group.posts.new(post_params)
      @post.user_id = @current_user.id

      if @post.save
        render json: { post: post_json(@post), comments: @post.comments  }, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end


    def update
      unless @post.user_id == @current_user.id
        render json: { errors: "Not Authorized" }, status: :unauthorized
        return
      end

      if @post.update(post_update_params)
        render json: { post: post_json(@post), comments: @post.comments }, status: :ok
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end


    def destroy
      unless @post.user_id == @current_user.id
        render json: { errors: "Not Authorized" }, status: :unauthorized
        return
      end

      if @post.destroy
        render json: { message: "Post Deleted" }, status: :ok
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
    private

    def set_group
      @group = Group.find(params[:group_id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Group not found" }, status: :not_found
    end

    def set_post
      @post = Post.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Post not found" }, status: :not_found
    end

    def post_update_params
      params.permit(:title, :content, *post_image_params)
    end

    def post_params
      params.permit(:title, :content, *post_image_params).merge(user_id: @current_user.id, group_id: params[:group_id])
    end

    def post_image_params
      (1..5).map { |i| "post_image_#{i}" }
    end

    def post_json(post)
      post_json = post.as_json(only: [:id, :user_id, :title, :content, :group_id, :created_at])

      images = []
      (1..5).each do |i|
        image = post.send("post_image_#{i}")
        images.push(image.url) if image
      end
      post_json['images'] = images

      post_json
    end

  end