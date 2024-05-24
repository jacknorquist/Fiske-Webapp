class GroupsController < ApplicationController
    before_action :set_group, only: [:show, :edit, :update, :destroy]

    def index
      @groups = Group.all
    end

    def show
    end

    def create
      @group = Group.new(group_params)
      if @group.save
        redirect_to @group, notice: 'Group was successfully created.'
      else
        render :new
      end
    end

    def edit
    end

    def update
      if @group.update(group_params)
        redirect_to @group, notice: 'Group was successfully updated.'
      else
        render :edit
      end
    end

    def destroy
      @group.destroy
      redirect_to groups_url, notice: 'Group was successfully destroyed.'
    end

    private

    def set_group
      @group = Group.find(params[:id])
    end

    def group_params
      params.require(:group).permit(:admin_id, :name, :fish_species, :area)
    end
  end