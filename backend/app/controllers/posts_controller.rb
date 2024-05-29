class PostsController < ApplicationController
    before_action :set_group
    before_action :set_post, only: [:show, :update, :destroy]

    def index
      render json: { posts: @group.posts}, status: :ok
    end

    def show
      render json: { post: @post, comments: @post.post_comments}, status: :ok
    end

    def create
      @post = @group.posts.new(post_params)
      @post.user_id = @current_user.id

      if params[:images].present?
          images = params[:images]
          @post.images.attach(io: images.tempfile, filename: images.original_filename, content_type: images.content_type, key: "posts/images/#{images.original_filename}")
        # end
      end


      if @post.save
        render json: { post: @post }, status: :created
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end

    def update
      if @post.user_id == @current_user.id
        if @post.update(post_update_params)
          render json: { post: @post, comments: @post.post_comments }, status: :ok
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      else
        render json: { errors: "Not Authorized" }, status: :unauthorized
      end
    end

    def destroy
      if @post.user_id == @current_user.id
        if  @post.destroy
          render json: { message: "Post Deleted" }, status: :ok
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      else
        render json: { errors: "Not Authorized" }, status: :unauthorized
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
      params.permit(:title, :content)
    end

    def post_params
      post_data = JSON.parse(params[:post])
      post_data['images'] = params[:images] if params[:images].present?
      post_data.merge(user_id: @current_user.id, group_id: params[:group_id])
    end
  end