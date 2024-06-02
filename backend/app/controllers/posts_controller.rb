class PostsController < ApplicationController
    before_action :set_group
    before_action :set_post, only: [:show, :update, :destroy]

    # def index
    #   render json: { posts: @group.posts}, status: :ok
    # end

    def index
      posts = @group.posts.map do |post|
        post_json(post).merge(comments: post.comments)
      end
      render json: { posts: posts }, status: :ok
    end


    def show
      render json: { post: post_json(@post), comments: @post.comments}, status: :ok
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
    end

    def set_post
      @post = @group.posts.find(params[:id])
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
      post_json = post.as_json(only: [:id, :admin_id, :title, :content])

      images = {}
      (1..5).each do |i|
        image = post.send("post_image_#{i}")
        images["post_image_#{i}"] = image.url if image
      end
      post_json['images'] = images

      post_json
    end

  end